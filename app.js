const { app, BrowserWindow, session }  = require('electron');


let win, secWin;
const createWindow = () => {
    // let customSes = session.fromPartition('persist: part1');

    // downloading the file
    let ses = session.defaultSession;
    
    // Cookies
    // let ses = session.defaultSession;

    // const getCookies = () => {
    //     ses.cookies.get({})
    //         .then((cookie) => {
    //             console.log(cookie);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    win = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
    });

    // secWin = new BrowserWindow({
    //     width: 600,
    //     height: 300,
    //     webPreferences: {
    //         nodeIntegration: true,
    //         partition: 'persist: part1'
    //         // session: customSes
    //     },
    // });

    // let ses1 = win.webContents.session;
    // let ses2 = secWin.webContents.session;
    // let defaultSes = session.defaultSession;
    // ses1.clearStorageData();

    // console.log(Object.is(ses1, customSes));

    win.loadFile('index.html');
    
    ses.on('will-download', (e, downloadItem, webContents) => {
        let filePath = downloadItem.getFilename();
        let bytes = downloadItem.getTotalBytes();
        
        // Save to Desktop
        downloadItem.setSavePath(app.getPath('desktop') + `/${filePath}`);


        downloadItem.on('updated', (e, state) => {
            let received = downloadItem.getReceivedBytes();

            let progress = Math.floor((received/bytes) * 100);
            
            webContents.executeJavaScript(`window.progress.value = ${progress}`);
        });
    });
    
    // secWin.loadFile('index.html');
    // win.loadURL('https://github.com');

    // const myCookie = { url: 'https://myurl.com', name:'cookie1', value: 'some value', expirationDate: 1643155489 };

    // ses.cookies.set(myCookie)
    //     .then(() => {
    //         console.log('custom cookie has been set');
    //         getCookies();
    //     });


    // win.webContents.on('did-finish-load', () => {
    //     getCookies();
    // });

    win.on('closed', () => {
        win = null;
    });

    // secWin.on('closed', () => {
    //     secWin = null;
    // });

    win.webContents.openDevTools();
    // secWin.webContents.openDevTools();
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
