import { app, ipcMain, dialog } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import Store from "electron-store";
import { v4 as uuidv4 } from "uuid";

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
  const books = store.get("books", []);
  store.set("books", [...books, { id: uuidv4(), ...arg }]);
  event.returnValue = [...books, { id: uuidv4(), ...arg }];
});

// Get all books in the storage
ipcMain.on("get-books", (event, _) => {
  const data = store.get("books", []);
  event.returnValue = data;
});

// Edit a book by his id
ipcMain.on("edit-book", (event, arg) => {
  const books = store.get("books", []);
  const newList = books.map((book) => {
    if (book.id == arg.id) return arg;
    return book;
  });
  store.set("books", newList);
  store.set("current", arg);
  event.returnValue = newList;
});

// Remove a specific book from storage with its id
ipcMain.on("remove-book", (event, arg) => {
  const books = store.get("books", []).filter((book) => book.id != arg);
  store.set("books", books);
  const recent = store.get("recent", []);
  const newRecent = recent.filter((book) => book.id != arg);
  store.set("recent", newRecent);
  event.returnValue = { books, recent: newRecent };
});

// Add a book to recent list
ipcMain.on("add-recent", (event, arg) => {
  const recent = arg;
  store.set("recent", recent);
  event.returnValue = "200";
});

// Get all recent books from storage
ipcMain.on("get-recent", (event, _) => {
  const data = store.get("recent", []);
  event.returnValue = data;
});

// Add current selected book to storage
ipcMain.on("add-current", (_, arg) => {
  store.set("current", arg);
});

// Get current selected book
ipcMain.on("get-current", (event, _) => {
  event.returnValue = store.get("current", {});
});

// Get the pdf file from a book
ipcMain.on("get-pdf", async (event) => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["openFile", "multiSelections"],
  });
  event.returnValue = filePaths[0];
});

// Add categories
ipcMain.on("add-categories", (event, arg) => {
  const categories = store.get("categories", []);
  store.set("categories", [...categories, arg]);
  event.returnValue = [...categories, arg];
});

// Get categories
ipcMain.on("get-categories", (event, _) => {
  event.returnValue = store.get("categories", []);
});

// Remove categorie
ipcMain.on("delete-category", (event, arg) => {
  const data = store.get("categories");
  const new_categories = data.filter((category) => category != arg);
  store.set("categories", new_categories);
  event.returnValue = new_categories;
});

// Select theme
ipcMain.on("set-theme", (_, arg) => {
  store.set("theme", arg);
});

// Get theme
ipcMain.on("get-theme", (event, _) => {
  event.returnValue = store.get("theme", "lofi"); // NOTE: should the default theme be managed here ?
});

// clear data
ipcMain.on("clear-data", () => {
  store.clear();
});
