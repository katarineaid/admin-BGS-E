function readWorkspace(service) {
  return async function (req, res) {
    const params = {
      userId: req.body.userId,
      workspaceName: req.body.workspaceName,
    };
    const data = await service.readWorkspace(params);
    res.json(data);
  };
}

module.exports = readWorkspace;