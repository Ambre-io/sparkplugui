import React from 'react';
import ReactDOM from 'react-dom/client';

import {App} from './App.tsx';


// @@@ Tauri invoke example
// import {invoke} from '@tauri-apps/api/tauri';
// invoke('greet', {name: 'Petit pouet'}
// ).then((response) => console.log(response)
// ).catch(e => console.error(`Error with the greet invoke: ${e}`));


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
