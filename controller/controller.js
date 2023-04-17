const index = (req, res) => {
   res.render("pages/index");
 };

const chat = (req, res) => {
  res.render("pages/chat");
}

module.exports = {
  index,
  chat,
};