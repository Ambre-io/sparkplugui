<h1 align=center>
    <div>
        <img src="sparkplugui/frontend/src/assets/images/logo.svg" width="140" style="filter: invert(78%) sepia(95%) saturate(1004%) hue-rotate(339deg) brightness(101%) contrast(101%)" />
    </div>
    <div style="color: #55C6E7;">SparkpluGUI</div>
</h1>
<h3 align=center>
<div style="color: #D724FF;">Software that displays decoded Sparkplug messages from MQTT IoT</div>
</h3>

screenshot

## 1. Quick start

Install:

- **linux**:
- **macos**:
- **windows**:

Run:

1. **Launch** SparkpluGUI software
2. **Type** the MQTT information in the form
3. **Click** on the "Connect" button

Observe:

- **Messages** shows the messages in a list
- **Topics Tree** shows the topics has a tree
- **Last Message** shows a payload in a JSON view

## 2. Technical stack

Thank you all for the beautiful technologies:

- [Wails](https://wails.app/) for the Go/TypeScript bridge
- [TypeScript](https://www.typescriptlang.org/) for the language
- [React](https://reactjs.org/) for the composition
- [Redux Toolkit](https://redux-toolkit.js.org/) for the state management
- [Material UI](https://material-ui.com/) for the UI
- [Emotion](https://emotion.sh/docs/introduction) for the CSS
- [React JSON View](https://raw.githack.com/uiwjs/react-json-view/v1-docs/index.html) for the JSON view
- [React Spring](https://www.react-spring.io/) for the animations
- [i18next](https://www.i18next.com/) for the internationalization
- [React Grid Layout](https://github.com/react-grid-layout/react-grid-layout) for the customizable layout
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) for the toasts
- [Vite](https://www.npmjs.com/package/@vitejs/plugin-react) for dev and build
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) for the types
- [ESLint](https://eslint.org/) for the linting
- [Go](https://golang.org/) for the backend
- [Sparkplug](https://www.cirrus-link.com/) for the protocol
- [MQTT](https://mqtt.org/) for the protocol
- [Paho](https://github.com/eclipse/paho.mqtt.golang) for the MQTT client
- [Protobuf](https://pkg.go.dev/google.golang.org/protobuf) for the Sparkplug payloads
- [Sparkplug Client](https://github.com/weekaung/sparkplugb-client) for the code base
- [JetBrains](https://www.jetbrains.com/) much love
- and many others 🙏

## 3. Usage details

Main software actions can be accessed from the top left panel. They trigger effects on other panels:

### 🗣️ Language Selection

Choose your favorite language:  🇺🇸 🇩🇪 🇫🇷 🇮🇹 

### ☁️ Connect/Disconnect Button and MQTT Information

- Host (required): the broker host
- Port (optional): the broker port
- Topic (required): '#' is selected by default for subscribing to all topics, choose a specific one to track what you
  need

### ↕️ Open/Close Button and Topics Tree


### 🔒 Unlock/Lock Button and Panels