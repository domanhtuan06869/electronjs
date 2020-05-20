const { ipcMain, app, BrowserWindow } = require('electron');
const path = require('path')
const url = require('url')
const openWindow = require('./common')

let mainWindow;

ipcMain.on('reply', (event, message) => {
  console.log(event, message);
  mainWindow.webContents.send('messageFromMain', ` ${message}`);
})

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'public/screen1/index.html'),
  }))

}

app.whenReady().then(() => {
 // createWindow()
  Open('public/screen1/index.html')
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) Open()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

function Open(pathFile) {
  let win;  
  win = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, pathFile),
  }))
  win.webContents.openDevTools()
}