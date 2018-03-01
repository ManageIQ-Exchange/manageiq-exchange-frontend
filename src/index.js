import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import AppRoutes from './components/AppRoutes';
import configureStore from './store/';
import './index.css';
import 'patternfly/dist/css/patternfly.min.css';
import 'patternfly/dist/css/patternfly-additions.min.css';

import i18n from './i18n';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <AppRoutes />
    </I18nextProvider>
  </Provider>,
  document.getElementById('main')
);
