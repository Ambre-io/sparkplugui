dev:
	wails dev -tags webkit2_41

build:
	wails build -tags webkit2_41

build linux:
	wails build -tags webkit2_41 -platform linux/amd64

build windows:
	wails build -tags webkit2_41 -platform windows/amd64

build mac:
	wails build -tags webkit2_41 -platform darwin/universal

sim:
	cd simulator && npm start
