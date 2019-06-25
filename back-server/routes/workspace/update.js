function update(service) {
  return async function (req, res) {
    const params = {
      userId: req.body.userId,
      updatedWorkspace: req.body.updatedWorkspace,
    };
    const data = await service.update(params);
    res.json(data);
  };
}

module.exports = update;