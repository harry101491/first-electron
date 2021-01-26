const { app, BrowserWindow, Tray, clipboard, screen}  = require('electron');

// Context Menu
// let contextMenu = Menu.buildFromTemplate([
//     {
//         label: 'Item 1'
//     },
//     {
//         role: 'editMenu'
//     } 
// ]);

// let mainMenue = Menu.buildFromTemplate(require('./mainMenu'));

// let menuItem1 = new MenuItem({
//     label: 'Different',
//     submenu: [
//         { label: 'Item1' },
//         { label: 'Item2' },
//         { label: 'Item3' },
//     ]
// });

// mainMenue.append(menuItem1);

let win, tray;
// const createTray = () => {
//     const image = clipboard.readImage();
//     tray = new Tray(image);
//     tray.setToolTip('About This App');
//     tray.on('click', (e) => {
//         win.isVisible() ? win.hide() : win.show();
//     });
// };

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
    });
    
    let displays = screen.getAllDisplays();

    console.log(displays);

    win.loadFile('index.html');

    // setInterval(() => {
    //     console.log( screen.getCursorScreenPoint() );
    // }, 100);
    // createTray();

    // win.webContents.on('context-menu', (e) => {
    //     contextMenu.popup(win);
    // });

    // Menu.setApplicationMenu(mainMenue);

    // Keyboard shortcuts
    // globalShortcut.register('CommandOrControl + G', () => {
    //     console.log('User has pressed G with combination key');
    // });

    // Creating a new dialog
    // win.webContents.on('did-finish-load', () => {
    //     dialog.showOpenDialog(win, {
    //         buttonLabel: 'Select Photo',
    //         defaultPath: app.getPath('desktop'),
    //         properties: [
    //             'openFile',
    //             'openDirectory',
    //             'multiSelections',
    //             'createDirectory'
    //         ]
    //     }).then((res) => {
    //         console.log(res);
    //     });

    //     dialog.showSaveDialog(win, {}).then((res) => {
    //         console.log(res);
    //     });

    //     const answers = ['Yes', 'No', 'MayBe'];

    //     dialog.showMessageBox(win, {
    //         title: 'Message Box',
    //         message: 'Please Select a Option',
    //         detail: 'Message Details',
    //         buttons: answers
    //     }).then((result) => {
    //         console.log(`User has clicked on ${answers[result.response]}`);
    //     });
    // });

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
