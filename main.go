/*
 * SparkpluGUI - Software that displays decoded Sparkplug messages from MQTT IoT
 *    @author guiklimek
 *    @site https://ambre.io/
 *
 * This program and the accompanying materials are made available under the
 * terms of the GNU GENERAL PUBLIC LICENSE which is available at
 *    https://github.com/Ambre-io/sparkplugui
 */

package main

import (
	"embed"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options/linux"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"net/http"
	"sparkplugui/backend/core"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS
var assetsHandler http.Handler

//go:embed frontend/src/assets/images/appicon.png
var icon []byte

var xs = 480
var sm = 768
var md = 996
var lg = 1200
var xl = 1922

var popWindowWidth = 1500
var popWindowHeight = 970

var minWindowWidth = md + 1
var minWindowHeight = 840

var maxWindowWidth = 2560
var maxWindowHeight = 1440

func main() {
	// Create an instance of the app structure
	app := core.NewApp()

	// Create application with options
	// see: https://wails.io/docs/reference/options/#application-options
	err := wails.Run(&options.App{
		Title:              "SparkpluGUI",
		Width:              popWindowWidth,
		Height:             popWindowHeight,
		MinWidth:           minWindowWidth,
		MinHeight:          minWindowHeight,
		MaxWidth:           maxWindowWidth,
		MaxHeight:          maxWindowHeight,
		OnStartup:          app.Startup,
		LogLevel:           logger.DEBUG,
		LogLevelProduction: logger.ERROR,
		AssetServer: &assetserver.Options{
			Assets:  assets,
			Handler: assetsHandler,
		},
		Bind: []interface{}{
			app,
		},
		Mac: &mac.Options{
			About: &mac.AboutInfo{
				Title:   "SparkpluGUI",
				Message: "Software that displays decoded Sparkplug messages from MQTT IoT",
				Icon:    icon,
			},
		},
		Linux: &linux.Options{
			Icon: icon,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
