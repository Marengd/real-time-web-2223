const { requestAccessToken, getRandomTrack, getRandomArtists } = require('../api/spotify');

requestAccessToken();

const start_quiz = (req, res) => {
  res.render('pages/start_quiz');
};

const enter_username = (req, res) => {
  res.render('pages/enter_username');
};

const create_or_join = (req, res) => {
  const username = req.query.username;
  res.render('pages/create_or_join', { username });
};

const join_by_id = (req, res) => {
  const username = req.query.username;
  res.render('pages/join_by_id', { username });
};

const quiz_room = (req, res) => {
  const room = req.query.room || 'default';
  res.render('pages/quiz_room', { room });
};


const quiz_result = (req, res) => {
  const winner = req.query.winner;
  res.render('pages/quiz_result', { winner });
};

module.exports = {
  start_quiz,
  enter_username,
  create_or_join,
  join_by_id,
  quiz_room,
  quiz_result,
};
