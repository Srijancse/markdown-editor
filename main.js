const electron = require('electron');
const pjson = require(__dirname + '/package.json');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow()
{
    mainWindow = new BrowserWindow({
        title:       pjson.display_name,
        width:       1400,
        height:      900,
        resizable:   true,
        frame:       true,
        icon:        __dirname + "/icon.png"
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.setMenu(null);

    mainWindow.on('closed', function()
    {
        mainWindow = null;
    });

    // prevent window title change
    mainWindow.on('page-title-updated', function(event, title)
    {
        event.preventDefault();
    });
}

function init()
{
    console.log("Electron-: Platform: " + process.platform);
    console.log("Electron-: Creating main window...");

    app.on('ready', createWindow);
    app.on('window-all-closed', function()
    {
        if (process.platform != 'darwin')
        {
            app.quit();
        }
    });

    app.on('activate', function()
    {
        if (mainWindow == null)
        {
            createWindow();
        }
    });
}

init();
