import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import './assets/styles/theme/index.css'

import './assets/styles/reset.scss';
import 'element-theme-default'
import './assets/styles/index.scss';

ReactDOM.render(<App />,document.getElementById('root'));
registerServiceWorker();
