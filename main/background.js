import { app, ipcMain, dialog } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import Store from "electron-store";

const isProd = process.env.NODE_ENV === "production";
const store = new Store();

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("add-book", (event, arg) => {
  const books = store.get("books") || [];
  store.set("books", [...books, { id: books.length, ...arg }]);
  event.returnValue = "200";
});

ipcMain.on("get-pdf", async (event) => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
  });
  event.returnValue = filePaths[0];
});

ipcMain.on("get-books", (event, _arg) => {
  const data = store.get("books");
  event.returnValue = data;
});
