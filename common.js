const { BrowserWindow } = require('electron');

module.exports = {
    openWindow: (url, config) => {
        let win;

        win = new BrowserWindow(config)
        
        win.loadURL(url.format({
            pathname: path.join(__dirname, url),
        }))
        win.webContents.openDevTools()

    }
}
