const { ipcRenderer } = require('electron')

ipcRenderer.on('message', (event, message) => console.log(message));

const sendMessageButton = document.getElementById('btn_send');

sendMessageButton.addEventListener('click', event => {
	let textValue = document.getElementById('text_input').value;
	ipcRenderer.send('reply', textValue);
	window.close();
});
