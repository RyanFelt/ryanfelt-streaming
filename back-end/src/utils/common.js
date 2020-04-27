const { resolveErrorSendResponse } = require('./errors');

exports.buildRoute = (handlerFunc) => async (req, res) => {
  try {
    const requestResponse = await handlerFunc(req);
    res.status(200).send(requestResponse);
  } catch (e) {
    resolveErrorSendResponse(e, res);
  }
};
