module.exports = (req, res, next) => {
  //if (req.method === 'GET') {
  //  req.method = 'GET';

  //console.log(req);
  req.query = req.body;
  // }
  next();
};
