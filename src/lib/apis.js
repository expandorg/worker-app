import fetch from './fetch';

const fetchAuth = () => fetch('/auth').then(r => r.json());

const logIn = (address, signature) => fetch('/login', 'POST', {
  body: {
    address,
    signature,
  },
  json: true,
}).then(res => res.json());

export {
  fetchAuth,
  logIn,
};

