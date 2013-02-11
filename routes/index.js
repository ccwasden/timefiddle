
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.sendfile('./public/home-page-mockup.html');
  //res.sendfile('./public/footer.html');
};