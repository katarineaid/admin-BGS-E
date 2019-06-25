function readPlugins(service) {
  return async function (req, res) {
    const params = {
      userId: req.body.userId,
    };
    const data = await service.readPlugins(params);
    res.json(data);
  };
}

module.exports = readPlugins;