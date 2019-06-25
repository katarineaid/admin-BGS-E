function remove(service) {
  return async function (req, res) {
    const params = {
      userId: req.body.userId,
      workspaces: req.body.workspaces,
    };
    const data = await service.remove(params);
    res.json(data);
  };
}

module.exports = remove;