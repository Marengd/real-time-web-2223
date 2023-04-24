const index = (req, res) => {
   res.render("pages/index");
 };

 const preLobby = (req, res) => {
  res.render("pages/preLobby");
};

const joinRoom = (req, res) => {
  res.render("pages/joinRoom");
};

const race = (req, res) => {
  res.render("pages/race");
};


module.exports = {
  index,
  preLobby,
  joinRoom,
  race,
};