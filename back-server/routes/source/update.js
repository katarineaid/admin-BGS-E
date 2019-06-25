function update(service) {
  return async function (req, res) {
    const params = {
      userId: req.body.userId,
      updatedSource: req.body.updatedSource,
      workspaceName: req.body.workspaceName,
    };
    const data = await service.update(params);
    res.json(data);
  };
}

module.exports = update;