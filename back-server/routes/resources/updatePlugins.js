function updatePlugins(service) {
  return async function (req, res) {
    const params = {
      userId: req.body.userId,
      updatedPlugins: req.body.updatedPlugins,
    };
    const data = await service.updatePlugins(params);
    res.json(data);
  };
}

module.exports = updatePlugins;