function read(service) {
  return async function (req, res) {
    const params = {
      userId: req.body.userId,
    };
    const data = await service.read(params);
    res.json(data);
  };
}

module.exports = read;