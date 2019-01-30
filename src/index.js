import React from 'react';
import { render } from 'react-dom';
import { setAppElement } from '@expandorg/components';

import App from './App';

const appElement = document.getElementById('root');

setAppElement(appElement);

render(<App />, appElement);
