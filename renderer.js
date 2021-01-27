// the file ran by the help of node integration in renderer process

const { desktopCapturer } = require('electron');

document.getElementById('screenshot-button').addEventListener('click', () => {
    desktopCapturer.getSources({ types: ['window'], thumbnailSize: { width: 1440, height: 900 } })
        .then((screens) => {
            console.log(screens);
            document.getElementById('screenshot-img').src = screens[0].thumbnail.toDataURL();
        })
        .catch((err) => {
            console.log(err);
        });
});