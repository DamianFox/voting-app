import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { saveState } from './loadStorage';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

store.subscribe(() => {
	saveState(store.getState());
});

ReactDOM.render((
    <Provider store={store}>
    	<App/>
    </Provider>
), document.getElementById('root'));

serviceWorker.unregister();