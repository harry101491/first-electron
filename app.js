const { app, BrowserWindow }  = require('electron');
// const bcrypt = require('bcrypt');
// const colors = require('colors');

let win, secWin;
// setTimeout(() => {
//     console.log('Checking App is ready:' + app.isReady());
// }, 2000);

// console.log(colors.rainbow('Hello World!'));
// bcrypt.hash('harshit', 10, (err, hash) => {
//     debugger;
//     console.log(hash);
// });

const createWindow = () => {
    win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        // titleBarStyle: 'hidden',
        // frame: false
    });

    secWin = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        },
        // parent: win,
        // modal: true,
        // show: false
    });

    win.loadFile('index.html');
    secWin.loadFile('index.html');

    win.on('closed', () => {
        win = null;
    });

    secWin.on('closed', () => {
        win.maximize();
    });
    
    // setTimeout(() => {
    //     secWin.show();
    //     setTimeout(() => {
    //         secWin.hide();
    //     }, 1000);
    // }, 2000);
    // secWin.on('closed', () => {
    //     secWin = null;
    // });

    // win.webContents.openDevTools();

    // win.once('ready-to-show', win.show);
    // win.loadURL('https://google.com');
}

app.on('ready', () => {
    // console.log('Home :', app.getPath('home'));
    // console.log('Temp :', app.getPath('temp'));

    // // Default location to store the data regarding the application
    // console.log('UserData :', app.getPath('userData'));
    // console.log('Desktop :', app.getPath('desktop'));
    // console.log('Music :', app.getPath('music'));
    // app.setName('Electron Udemy');
    // console.log('Name of App: ', app.getName());
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

// Using instance method to quit the app after some time
// app.on('browser-window-blur', () => {
//     setTimeout(app.quit, 3000);
// });

// The Event hook for checking just before quitting
// app.on('before-quit', (e) => {
//     // preventing the default flow
//     e.preventDefault();
//     console.log('before quitting!');
// });

// Event to handle the focus and blur of the browser window
// app.on('browser-window-blur', () => {
//     console.log('window blurred');
// });

// app.on('browser-window-focus', () => {
//     console.log('window focused');
// });