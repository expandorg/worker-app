import React from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';

import App from './App';

const appElement = document.getElementById('root');

Modal.setAppElement(appElement);

render(<App />, appElement);
