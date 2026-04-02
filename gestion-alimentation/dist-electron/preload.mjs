"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  getVersion: () => electron.ipcRenderer.invoke("app:getVersion"),
  onMainMessage: (handler) => {
    const listener = (_event, message) => handler(message);
    electron.ipcRenderer.on("main-process-message", listener);
    return () => electron.ipcRenderer.off("main-process-message", listener);
  }
});
