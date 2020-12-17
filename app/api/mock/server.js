const db = require('./db.json');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(db);
const port = process.env.PORT || 3000;
const middleware = jsonServer.defaults();
const pause = require('connect-pause');
const { insert } = require('ramda');
const fs = require('fs');
const _ = require('lodash');

server.use(middleware);
server.use(jsonServer.bodyParser);

server.use(
  jsonServer.rewriter({
    '/wp-json/aam/v2/authenticate': '/authenticate',
    '/wp-json/aam/v2/jwt/revoke': '/revoke',

    '/wp-json/wc/v3/products?per_page=:per_page':
      '/products?_start=0&_end=:per_page',

    '/wp-json/wc/v3/products?per_page=:per_page&orderby=:orderby':
      '/products?_start=0&_end=:per_page&_sort=:orderby&_order=desc',

    '/wp-json/wc/v3/customers/:id': '/customers/:id',

    '/wp-json/wc/v3/products/:id': '/products/:id',

    '/wp-json/wc/v3/orders?customer=:id&status=:status':
      '/orders?customer_id_like=:id&status_like=:status',

    '/wp-json/wc/v3/orders': '/orders',
    '/wp-json/wc/v3/orders/:id': '/orders/:id',
  }),
);
//server.use(pause(2000));
server.use((req, res, next) => {
  if (req.method === 'POST') {
    switch (req.url) {
      case '/authenticate':
        isAuthorised(req.body.username, req.body.password)
          ? res.status(200).json(db.authenticate)
          : res.status(400).json(db.invalidUser);
        break;

      case '/revoke':
        next();
        break;
      case '/orders':
        addOrder(req, res);
        break;
      default:
        console.log('Hello! POST Others');
        //next();
        break;
    }
  } else if (req.method === 'GET') {
    next();
  } else if (req.method === 'PUT') {
    switch (req.url) {
      case '/orders/' + db.dummyOrder.id:
        console.log('Orders add cart!');
        addCartItem(req, res);
        break;
      case '--':
        next();
        break;
      default:
        console.log('Hello! PUT Others');
        next();
        break;
    }
  } else {
    next();
  }
});

function isAuthorised(username, password) {
  //Simulate authorization based on dummy users
  return db.validUsers.find((user) => {
    return user.username === username && user.password === password;
  });
}

//Create a cart
function addOrder(req, res) {
  const lowDB = router.db; // Assign the lowdb instance
  const table = lowDB.get('orders');
  // Create a new entry if this ID does not exist
  if (_.isEmpty(table.find({ id: db.dummyOrder.id }).value())) {
    table.push(db.dummyOrder).write(); //db.dummyOrder is a cart template in this scenario
  }
  return res.status(200).json(db.orders);
}

function addCartItem(req, res) {
  const lowDB = router.db; // Assign the lowdb instance
  const table = lowDB.get('orders');

  table
    .find({ id: db.dummyOrder.id })
    .assign({ line_items: req.body.line_items })
    .write();

  return res.status(200).json(db.orders);
}

//this will directly edit the initial db
function userDirectJson() {
  //insert(lowDB, 'orders', obj);
  /*let obj = {};
   fs.readFile('./app/api/mock/db.json', 'utf8', (err, data) => {
     if (err) {
       res.status(500);
     } else {
       obj = JSON.parse(data); //convert the JSON from the db.json file to an object
       obj.orders = [];
       obj.orders.push(db.dummyOrder); //add data from the request body to the object

       const json = JSON.stringify(obj); //convert object back to JSON
       console.log('Reading' + json);
       // write it back
       fs.writeFile('./app/api/mock/db.json', json, 'utf8', (error) => {
         if (error) {
           console.log('Failt' + error);

           res.status(500);
         } else {
           next();
           res.status(200);
         }
       });
     }
   });*/
}

server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running at ' + port);
});
