const { app, BrowserWindow }  = require('electron');


let win, secWin;
const createWindow = () => {
    win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
    });

    win.loadFile('index.html');

    win.on('closed', () => {
        win = null;
    });

    win.webContents.openDevTools();
}

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
