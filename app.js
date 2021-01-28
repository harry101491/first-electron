const { app, BrowserWindow, ipcMain, dialog }  = require('electron');


let win;

const askFruit = async () => {
    let fruits = [ 'Apple', 'Orange', 'Grape' ];

    let choice = await dialog.showMessageBox({
        message: 'Pick a Fruit',
        buttons: fruits
    });

    return fruits[choice.response];
};

const createWindow = () => {
    win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
    });

    // setTimeout(() => {
    //     askFruit().then((answer) => {
    //         console.log(answer);
    //     });
    // }, 1000);

    win.loadFile('index.html');

    win.on('closed', () => {
        win = null;
    });

    win.webContents.openDevTools();

    // win.webContents.on('did-finish-load', (e) => {
    //     win.webContents.send('mailbox', {
    //         recepient: 'harshit',
    //         sender: 'main process',
    //         data: {
    //             value: 20
    //         }
    //     });
    // });
}

// ipcMain.on('ask-fruit', (e, args) => {
//     askFruit().then((answer) => {
//         console.log(answer);
//     });
// });

ipcMain.handle('ask-fruit', (e, args) => {
    return askFruit();
});


// ipcMain.on('sync-message', (e, args) => {
//     console.log(args);

//     setTimeout(() => {
//         e.returnValue = 'A Sync Response from the main process';
//     }, 4000);
// });


// ipcMain.on('channel1', (e, args) => {
//     console.log(args);

//     // acknowleging or sending something back
//     e.sender.send('channel1-response', 'Message received on channel1. Thank you!');
// });

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
