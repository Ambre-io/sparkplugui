<h1 align=center>
    <div>
        <img src="sparkplugui/frontend/src/assets/images/logo.svg" width="240" style="filter: 'invert(78%) sepia(95%) saturate(1004%) hue-rotate(339deg) brightness(101%) contrast(101%)'" />
    </div>
    <div>SparkpluGUI</div>
</h1>
<h3 align=center>
<div>Software that displays decoded Sparkplug messages from MQTT IoT</div>
</h3>

screenshot


## 1/ Quick start

Install depending on your OS:

- linux:
- macos:
- windows: 

Run:

1. Launch SparkpluGUI software
2. Type the broker information in the form
3. Click on the "Connect" button

Observe:

- the "Messages" pannel shows the messages in a list
- the "Topics" pannel shows the topics in a tree
- the "Last Message" pannel shows the last message received

and we're done!

## 2/ Technical stack

Thank you all for the beautiful technologies:
- [Wails](https://wails.app/) for the Go/TypeScript bridge
- [Go](https://golang.org/) for the backend
- [MQTT](https://mqtt.org/) for the protocol
- [Sparkplug](https://www.cirrus-link.com/) for the protocol
- [TypeScript](https://www.typescriptlang.org/) for the frontend
- [React](https://reactjs.org/) for the frontend
- [Material UI](https://material-ui.com/) for the UI
- [React JSON View](https://raw.githack.com/uiwjs/react-json-view/v1-docs/index.html) for the JSON view
