/*
 * GET home page.
 */
exports.index = function(req, res){
  res.sendfile('./public/views/home-page-mockup.html');
};