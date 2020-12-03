const db = require('./db.json');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(db);
const port = process.env.PORT || 3000;
const middleware = jsonServer.defaults();
const pause = require('connect-pause');

server.use(middleware);
server.use(jsonServer.bodyParser);

server.use(
  jsonServer.rewriter({
    '/wp-json/aam/v2/authenticate': '/authenticate',
    '/wp-json/aam/v2/jwt/revoke': '/revoke',

    '/wp-json/wc/v3/products?per_page=:per_page&orderby=:orderby':
      '/products?_start=0&_end=:per_page&_sort=:orderby&_order=desc',

    '/wp-json/wc/v3/products?per_page=:per_page':
      '/products?_start=0&_end=:per_page',

    '/wp-json/wc/v3/products/:id': '/products/:id',
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
        console.log('Hello!');
        next();
        break;
      default:
        console.log('Hello! Others');
        //next();
        break;
    }
  } else if (req.method === 'GET') {
    next();
  } else {
    next();
  }
});

function isAuthorised(username, password) {
  return db.validUsers.find((user) => {
    return user.username === username && user.password === password;
  });
}

server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running at ' + port);
});
