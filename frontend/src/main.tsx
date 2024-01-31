/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */

import React from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './App';

const container = document.getElementById('root');

const root = createRoot(container!);

// see: https://react.dev/reference/react/StrictMode
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
