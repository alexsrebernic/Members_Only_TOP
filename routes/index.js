var express = require('express');
var router = express.Router();
const user_controller = require("../controllers/userController")
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  res.render('index', { title: '.members-only: Message Board', user:req.user });
});

router.get('/log_in', user_controller.user_log_in_get)
router.post('/log_in', user_controller.user_log_in_post)
router.get('/sign_up', user_controller.user_sign_up_get)
router.post('/sign_up',user_controller.user_sign_up_post)
module.exports = router;
