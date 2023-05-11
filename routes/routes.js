const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/', controller.start_quiz);
router.get('/enter_username', controller.enter_username);
router.get('/create_or_join', controller.create_or_join);
router.get('/join_by_id', controller.join_by_id);
router.get('/quiz_room', controller.quiz_room);
router.get('/quiz_result', controller.quiz_result);

module.exports = router;