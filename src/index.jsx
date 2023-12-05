import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '~/redux/store.jsx';
import App from './App.jsx';
import './style.css';
import GlobalStyles from './components/GlobalStyles/GlobalStyles.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </PersistGate>
        </Provider>

    </React.StrictMode>,
);