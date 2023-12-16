import React from 'react'
import ReactDOM from 'react-dom/client'
import {invoke} from '@tauri-apps/api/tauri'

import {App} from './App.tsx'
import './index.css'


invoke('greet', { name: 'World' }
).then((response) => console.log(response)
).catch(e => console.error(`Error with the greet invoke: ${e}`));


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {/*<App/>*/}
        pouet
    </React.StrictMode>
);
