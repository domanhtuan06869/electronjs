const path = require('path');
const { ipcRenderer, remote } = require('electron')
const BrowserWindow = require('electron').remote.BrowserWindow;
const openSecondWindowButton = document.getElementById('openpupup');

ipcRenderer.on('messageFromMain', (event, message) => {
  console.log(` ${message}`);
  document.getElementById('text').innerHTML = message
});

openSecondWindowButton.addEventListener('click', (event) => {
  let win = new BrowserWindow({
    width: 400, height: 275, webPreferences: {
      nodeIntegration: true
    }
  });
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('message', 'Gửi data đến màn sau')
  });
  win.webContents.openDevTools();
  win.on('close', () => {
    win = null;
  });

  win.loadURL(path.join('file://', process.cwd(), 'public/view/index_child.html'));
  win.show();
});

document.getElementById('open_dialog').addEventListener('click', () => {
  remote.dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
})