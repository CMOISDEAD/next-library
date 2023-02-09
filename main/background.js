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
    autoHideMenuBar: true,
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

// Add a book to the storage
ipcMain.on("add-book", (event, arg) => {
  const books = store.get("books") || [];
  store.set("books", [...books, { id: books.length, ...arg }]);
  event.returnValue = "200";
});

// Get the pdf file from a book
ipcMain.on("get-pdf", async (event) => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
  });
  event.returnValue = filePaths[0];
});

// Get all books in the storage
ipcMain.on("get-books", (event, _arg) => {
  const data = store.get("books");
  event.returnValue = data;
});

// Remove a specific book from storage with its id
ipcMain.on("remove-book", (event, arg) => {
  const books = store.get("books").filter((book) => book.id != arg);
  store.set("books", books);
  event.returnValue = books;
});
