var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '.members-only: Message Board' });
});
router.get('/sign_in',function(req,res,next){
  res.render('sign_in', )
})
router.get('/sign_up',function(req,res,next){
  res.render('sign_up', { title: '.members-only: Sign Up' })
})
module.exports = router;
