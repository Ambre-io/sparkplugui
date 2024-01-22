<h1 align=center>
    <div>
        <img src="sparkplugui/frontend/src/assets/images/logo.svg" width="180" style="filter: invert(78%) sepia(95%) saturate(1004%) hue-rotate(339deg) brightness(101%) contrast(101%)" />
    </div>
    <font size="7" style="color: #55C6E7">SparkpluGUI</font>
</h1>
<h3 align=center>
<div style="color: #D724FF;">Software that displays decoded Sparkplug messages from MQTT IoT</div>
</h3>

screenshot

## 1. Quick Start

Install:

- **linux**:
- **macos**:
- **windows**:

Run:

1. **Launch** the SparkpluGUI software
2. **Type** the MQTT information in the form
3. **Click** on the "Connect" button

Observe:

- **Messages** shows the messages in a list
- **Topics Tree** shows the topics has a tree
- **Last Message** shows the payload in a JSON view

## 2. Technical Stack

Thank you all for the beautiful technologies:

- [Wails](https://wails.app/) for the Go/TypeScript framework
- [Go](https://golang.org/) for the language
- [TypeScript](https://www.typescriptlang.org/) for the language
- [React](https://reactjs.org/) for the composition
- [Redux Toolkit](https://redux-toolkit.js.org/) for the state management
- [Material UI](https://material-ui.com/) for the UI
- [Emotion](https://emotion.sh/docs/introduction) for the CSS
- [React JSON View](https://raw.githack.com/uiwjs/react-json-view/v1-docs/index.html) for the JSON display
- [React Spring](https://www.react-spring.io/) for the animations
- [i18next](https://www.i18next.com/) for the internationalization
- [React Grid Layout](https://github.com/react-grid-layout/react-grid-layout) for the customizable layout
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/) for the toasts
- [Vite](https://www.npmjs.com/package/@vitejs/plugin-react) for dev and build
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) for the types
- [ESLint](https://eslint.org/) for the linting
- [Sparkplug](https://www.cirrus-link.com/) for the protocol
- [MQTT](https://mqtt.org/) for the protocol
- [Paho](https://github.com/eclipse/paho.mqtt.golang) for the MQTT client
- [Protobuf](https://pkg.go.dev/google.golang.org/protobuf) for the Sparkplug payloads
- [Sparkplug Client](https://github.com/weekaung/sparkplugb-client) for the code base
- [JetBrains](https://www.jetbrains.com/) much love
- and many others 🙏

## 3. Usage Details

Main software actions can be accessed from the top left panel. They trigger effects on other panels.

### 3.1 Select 🗣️ Language

Choose your favorite language:  🇺🇸 🇩🇪 🇫🇷 🇮🇹 🇹🇳 🇯🇵 🇺🇦 🇷🇺 🇪🇸 🇨🇳 🏴󠁣󠁮󠀶󠀵󠁿 🏴󠁺󠁡󠁮󠁬󠁿 🏴󠁩󠁲󠀱󠀶󠁿  

### 3.2 Button ☁️ Connect/Disconnect

*Connect* the software to the defined server in the **MQTT Information** panel. After the success notification, 
It starts to receive messages which hydrate the **Messages** and the **Topics Tree** panels.
If you click on a tree branch, you will see the associated message in **Last Message** panel.

Use the same button to *Disconnect* the software from the MQTT server, 
to stop the flow or to modify the topic for instance.

#### MQTT Information

|                             Fields | Description                                                   | Required |
|-----------------------------------:|:--------------------------------------------------------------|:--------:|
|                               Host | MQTT server IP or domain name                                 |    x     |
|                               Port | If you use an IP as host you maybe need the port too          |          |
|                              Topic | Choose a generic or a specific topic to track what you need   |    x     |
|                    Username  [TLS] | Use a valid username for the authentication                   |          |
|                     Password [TLS] | Use a valid password for the authentication                   |          |
| Concatenated CA certificates [TLS] | The classic TLS certificate from the trusted authority (.pem) |          |
|           Client certificate [TLS] | Client certificate signed by the CA (.pem)                    |          |
|                   Client key [TLS] | Keyfile for the client certificate (.pem)                     |          |

💡 If you need to authenticate the software to the MQTT server, please fill the 5 TLS fields to use an optimal and secure connection.

### 3.3 Button ↕️ Open/Close

The **Topics Tree** is built over time as messages arrive. 
You can open the entire tree for easy access to your nodes and devices, or close it by pressing this button.

### 3.4 Button 🔒 Unlock/Lock

When you click the unlock button, **MQTT Information**, **Messages**, **Topics Tree** and **Last Message** panels are customizable:
- move it by drag and drop
- resize it from the bottom right corner
- choose the layout you prefer

Then lock it again, in order to use the software.
