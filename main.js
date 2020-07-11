// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog, ipcMain, Menu} = require('electron')
const path = require('path')
const fs = require('fs')

let mainWindow;

const template = [
    {
        label: app.name,
        submenu: [
            { role: 'about' },
            { role: 'quit' }
        ]
    }
]
const mainMenu = Menu.buildFromTemplate(template)

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
  })

    // Main menu in the browser window.
    // Menu.setApplicationMenu(mainMenu)

    // and load the index.html of the app.
    mainWindow.loadFile('./app/index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

app.allowRendererProcessReuse = true

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no ot4er windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('printChannel', (event, content) => {
    // console.log(content)
    const secWindow = new BrowserWindow({
        width: 800,
        height: 600,
        x: 100,
        y: 100,
        webPreferences: {
            nodeIntegration: true,
        }
    })
    secWindow.loadFile('./app/print.html')
})

ipcMain.on('loadChannel', (event, content) => {
    dialog.showOpenDialog(mainWindow, {properties: ['openFile']}).then(result => {
        let data = {
            'filePath': result.filePaths[0]
        };
        data['data'] = JSON.parse(fs.readFileSync(result.filePaths[0]));
        event.reply('loadChannel-reply', JSON.stringify(data));
    }).catch(err => {
        console.log(err);
    });
});

ipcMain.on('saveChannel', (event, content) => {
    content = JSON.parse(content);
    if (content.filePath === null) {
        dialog.showSaveDialog(mainWindow, {defaultPath: 'groceryList.json'}).then(result => {
            if (result.filePath) {
                writeToFile(event, content);
            };
        });
    } else {
        writeToFile(event, content);
    }
});

ipcMain.on('saveAsChannel', (event, content) => {
    content = JSON.parse(content);
    dialog.showSaveDialog(mainWindow, {defaultPath: 'groceryList.json'}).then(result => {
        if (result.filePath) {
            content.filePath = result.filePath;
            writeToFile(event, content);
        };
    });
});

function writeToFile(event, content) {
    fs.writeFileSync(content.filePath, JSON.stringify(content.data));
    event.reply('saveChannel-reply', content.filePath);
}