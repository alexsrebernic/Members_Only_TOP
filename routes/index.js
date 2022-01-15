var express = require('express');
var router = express.Router();
const user_controller = require("../controllers/userController")
const message_controller = require('../controllers/messageController')
/* GET home page. */
router.get('/', message_controller.message_board_get);
router.post('/',message_controller.message_board_post)

router.get('/log_out',user_controller.user_log_out_get)

router.get('/log_in', user_controller.user_log_in_get)
router.post('/log_in', user_controller.user_log_in_post)

router.get('/sign_up', user_controller.user_sign_up_get)
router.post('/sign_up',user_controller.user_sign_up_post)

router.get('/become_a_member',user_controller.user_become_a_member_get)
router.post('/become_a_member',user_controller.user_become_a_member_post)
module.exports = router;
