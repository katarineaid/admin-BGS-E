function remove(service) {
  return async function (req, res) {
    const params = {
      userId: req.body.userId,
      sources: req.body.sources,
      workspaceName: req.body.workspaceName,
    };
    const data = await service.remove(params);
    res.json(data);
  };
}

module.exports = remove;