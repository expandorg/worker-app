import fetch from 'isomorphic-fetch';

const checkStatus = (res) => {
  if (res.status < 200 || res.status >= 300) {
    throw new Error(res.statusText);
  }

  return res;
};

export default (endpoint, method = 'GET', { body, json, ...opts } = { body: null, json: true }) => {
  const options = {
    credentials: 'include',
    method,
  };

  if (body) {
    if (json) {
      options.headers = {
        ...(opts.headers),
        'Content-Type': 'application/json',
      };

      options.body = JSON.stringify(body);
    } else {
      options.body = body;
    }
  }

  return fetch(`${process.env.BACKEND_ADDRESS}${endpoint}`, options).then(checkStatus);
};
