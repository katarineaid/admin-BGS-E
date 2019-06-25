function create(service) {
  return async function (req, res) {
    const params = {
      userId: req.body.userId,
    };
    const data = await service.create(params);
    res.json(data);
  };
}

module.exports = create;