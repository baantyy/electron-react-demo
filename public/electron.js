const electron = require('electron');
const { ipcMain, app } = electron;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
let imageWindow;
let settingsWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: { nodeIntegration: true }});
    // webPreferences: { webSecurity: false } // only for dev cors
    imageWindow = new BrowserWindow({ width: 500, height: 500, parent: mainWindow, show: false, webPreferences: { nodeIntegration: true } });
    settingsWindow = new BrowserWindow({ width: 500, height: 500, parent: mainWindow, show: false, webPreferences: { nodeIntegration: true } });

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    imageWindow.loadURL(isDev ? 'http://localhost:3000/image' : `file://${path.join(__dirname, '../build/index.html')}`);
    settingsWindow.loadURL(isDev ? 'http://localhost:3000/settings' : `file://${path.join(__dirname, '../build/index.html')}`);

    mainWindow.on('closed', () => mainWindow = null);
    imageWindow.on('close', e => {
        e.preventDefault();
        imageWindow.hide();
    });
    settingsWindow.on('close', e => {
        e.preventDefault();
        settingsWindow.hide();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on("toggleImage", (event, arg) => {
    imageWindow.show();
    imageWindow.webContents.send('image',arg);
});

ipcMain.on("toggleSettings", (event, arg) => {
    settingsWindow.isVisible() ? settingsWindow.hide() : settingsWindow.show();
});