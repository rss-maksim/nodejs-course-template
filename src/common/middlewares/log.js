const { isEmpty } = require('ramda');
const { infoLogger } = require('../../logger');

const formatBody = body =>
  isEmpty(body) ? '' : ` **body: ${JSON.stringify(body)}`;

const formatQueryParams = query =>
  isEmpty(query) ? '' : ` **queryParams: ${JSON.stringify(query)}`;

const log = (req, res, next) => {
  const { body, method, url, query } = req;
  const { statusCode } = res;
  infoLogger.info({
    method,
    url,
    body: formatBody(body),
    query: formatQueryParams(query),
    statusCode
  });
  next();
};

module.exports = log;
