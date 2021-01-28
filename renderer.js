// the file ran by the help of node integration in renderer process

// Ask a Fruit Dialog
const { ipcRenderer } = require('electron');


document.getElementById('askFruit').addEventListener('click', (e) => {
    // ipcRenderer.send('ask-fruit');
    ipcRenderer.invoke('ask-fruit')
        .then((answer) => {
            console.log(answer);
        });
});



// const { ipcRenderer } = require('electron');

// // just to show the Renderer Thread will be blocked untill the sync job will not be done
// let i = 0;
// setInterval(() => {
//     console.log(i);
//     i++;
// }, 1000);

// document.getElementById('talk').addEventListener('click', (e) => {
//     // ipcRenderer.send('channel1', 'Hello from the Renderer');
//     let res = ipcRenderer.sendSync('sync-message', 'A sync message from renderer');
//     console.log(res);
// });

// ipcRenderer.on('channel1-response', (e, args) => {
//     console.log(args);
// });

// ipcRenderer.on('mailbox', (e, args) => {
//     console.log(args);
// });