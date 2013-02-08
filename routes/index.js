
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.sendfile('./public/home-page-mockup.html');
//  res.render('index', { title: 'TimeFiddle' });
};