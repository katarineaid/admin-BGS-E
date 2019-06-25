const validatePluginsForm = (values) => {
  const errors = {};
  const { esri, wfs, wms, wmts } = values;
  if (!(esri || wfs || wms || wmts)) {
    errors.wmts = 'Выберите из предложенных вариантов'
  }
  return errors;
};

export { validatePluginsForm }