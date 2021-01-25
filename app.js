const { app, BrowserWindow, webContents }  = require('electron');


let mainWin;

const createWindow = () => {
    mainWin = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
    });

    let wc = mainWin.webContents;
    // console.log('Web content is: ', webContents.getAllWebContents());

    mainWin.loadFile('index.html');
    
    // Context Menu
    wc.on('context-menu', (e, params) => {
        // console.log(`Conext Menu clicked on ${params.mediaType} the x: ${params.x} and y: ${params.y}`);
        let selectedText = params.selectionText;
        wc.executeJavaScript(`alert(${selectedText})`);
    });
    
    
    // mainWin.loadURL('https://httpbin.org/basic-auth/user/passwd');

    // wc.on('login', (e, request, authInfo, callback) => {
    //     console.log('Inside login event', request);
    //     callback('user', 'passwd');
    // });

    // wc.on('did-navigate', (e, url, statusCode, message) => {
    //     console.log(`The Loaded Content: ${url}`);
    //     console.log(statusCode);
    // });

    // wc.on('before-input-event', (e, input) => {
    //     console.log(`Event ${input.key} : ${input.type}`);
    // });
    
    // wc.on('new-window', (e, url) => {
    //     console.log(`The url came here is: ${url}`);
    // });

    // wc.on('did-finish-load', () => {
    //     // when dom is ready that doesn't mean all the content has loaded
    //     console.log('Content Loaded');
    // });
    
    // wc.on('dom-ready', () => {
    //     // when dom is ready that doesn't mean all the content has loaded
    //     console.log('DOM is ready');
    // });

    mainWin.on('closed', () => {
        win = null;
    });

    // mainWin.webContents.openDevTools();
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
