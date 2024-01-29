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
	"github.com/wailsapp/wails/v2/pkg/options/windows"
	"net/http"
	"os"
	"sparkplugui/backend/core"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS
var assetsHandler http.Handler
var assetsMidldeware assetserver.Middleware

//go:embed frontend/src/assets/images/icon.png
var icon []byte

var xs = 480
var sm = 768
var md = 996
var lg = 1200
var xl = 1922

var popWindowWidth = 1500
var popWindowHeight = 970

var minWindowWidth = md + 1
var minWindowHeight = 810

var maxWindowWidth = 2560
var maxWindowHeight = 1440

func main() {
	// Create an instance of the app structure
	app := core.NewApp()

	// Create application with options
	// see: https://wails.io/docs/reference/options/#application-options
	err := wails.Run(&options.App{
		Title:             "SparkpluGUI",
		Width:             popWindowWidth,
		Height:            popWindowHeight,
		DisableResize:     false,
		Fullscreen:        false,
		WindowStartState:  options.Normal,
		Frameless:         false, // top bar disapear if true, but it's needed to drag the soft
		MinWidth:          minWindowWidth,
		MinHeight:         minWindowHeight,
		MaxWidth:          maxWindowWidth,
		MaxHeight:         maxWindowHeight,
		StartHidden:       false,
		HideWindowOnClose: false,
		BackgroundColour:  &options.RGBA{R: 0, G: 0, B: 0, A: 255},
		//AlwaysOnTop:       false,
		AssetServer: &assetserver.Options{
			Assets:     assets,
			Handler:    assetsHandler,
			Middleware: assetsMidldeware,
		},
		//Menu:               app.applicationMenu(),
		LogLevel:           logger.DEBUG,
		LogLevelProduction: logger.ERROR,
		OnStartup:          app.Startup,
		//OnDomReady:         app.domready,
		//OnShutdown:         app.shutdown,
		//OnBeforeClose:      app.beforeClose,
		CSSDragProperty:                  "--wails-draggable",
		CSSDragValue:                     "drag",
		EnableDefaultContextMenu:         false,
		EnableFraudulentWebsiteDetection: false,
		Bind: []interface{}{
			app,
		},
		//EnumBind: []interface{}{}, // A slice of Enum arrays that need to be bound to the frontend.
		ErrorFormatter: func(err error) any { return err.Error() },
		SingleInstanceLock: &options.SingleInstanceLock{
			UniqueId:               "c9c8fd93-6758-4144-87d1-34bdb0a8bd60",
			OnSecondInstanceLaunch: func(secondInstanceData options.SecondInstanceData) { os.Exit(0) },
		},
		Windows: &windows.Options{
			WebviewIsTransparent:              false,
			WindowIsTranslucent:               false,
			BackdropType:                      windows.None,
			DisableWindowIcon:                 false,
			DisableFramelessWindowDecorations: false,
			WebviewUserDataPath:               "",
			WebviewBrowserPath:                "",
			Theme:                             windows.SystemDefault,
			CustomTheme: &windows.ThemeSettings{
				DarkModeTitleBar:   windows.RGB(20, 20, 20),
				DarkModeTitleText:  windows.RGB(200, 200, 200),
				DarkModeBorder:     windows.RGB(20, 0, 20),
				LightModeTitleBar:  windows.RGB(200, 200, 200),
				LightModeTitleText: windows.RGB(20, 20, 20),
				LightModeBorder:    windows.RGB(200, 200, 200),
			},
			// User messages that can be customised
			//Messages *windows.Messages
			// OnSuspend is called when Windows enters low power mode
			//OnSuspend func()
			// OnResume is called when Windows resumes from low power mode
			//OnResume func(),
			WebviewGpuIsDisabled: false,
		},
		Mac: &mac.Options{
			TitleBar: &mac.TitleBar{
				TitlebarAppearsTransparent: true,
				HideTitle:                  false,
				HideTitleBar:               false,
				FullSizeContent:            false,
				UseToolbar:                 false,
				HideToolbarSeparator:       true,
				//OnFileOpen:                 app.onFileOpen,
				//OnUrlOpen:                  app.onUrlOpen,
			},
			Appearance:           mac.DefaultAppearance,
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			About: &mac.AboutInfo{
				Title:   "SparkpluGUI",
				Message: "Software that displays decoded Sparkplug messages from MQTT IoT",
				Icon:    icon,
			},
		},
		Linux: &linux.Options{
			Icon:                icon,
			WindowIsTranslucent: false,
			WebviewGpuPolicy:    linux.WebviewGpuPolicyAlways,
			ProgramName:         "SparkpluGUI",
		},
		Debug: options.Debug{
			OpenInspectorOnStartup: false,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
