const {app, BrowserWindow, Menu} = require("electron")
require('electron-reload')(__dirname)

function createWindow(){
    const mainwindow = new BrowserWindow({
        width:800,
        height:600
    })

    mainwindow.loadFile('src/ui/index.html')
    mainwindow.webContents.openDevTools()

    let menu = Menu.buildFromTemplate([
        {
            label:"File",
            submenu:[
                {label:'Get Article'},
                {label:'Exit',
                click(){
                    app.quit()
                }
                }
            ]
        },
        {label:"About"}
    ])

    Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
    createWindow()
})
