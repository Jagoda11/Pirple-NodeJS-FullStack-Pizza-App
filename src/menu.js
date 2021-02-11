const menuItems = [
  {
    id: 1,
    name: "pasta",
  },
  {
    id: 2,
    name: "sushi",
  },
];

function serverHandler(req, res) {
  if (req.method == "GET" && req.url === "/menu") {
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(menuItems));
    res.end();
    return;
  }
  res.statusCode = 404;
  res.write("not found");
  res.end();
}

module.exports = { serverHandler };
