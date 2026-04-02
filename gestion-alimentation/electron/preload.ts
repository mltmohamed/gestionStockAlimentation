import { ipcRenderer, contextBridge } from 'electron'

type Unsubscribe = () => void

contextBridge.exposeInMainWorld('api', {
  getVersion: () => ipcRenderer.invoke('app:getVersion') as Promise<string>,
  onMainMessage: (handler: (message: string) => void): Unsubscribe => {
    const listener = (_event: unknown, message: string) => handler(message)
    ipcRenderer.on('main-process-message', listener)
    return () => ipcRenderer.off('main-process-message', listener)
  },
})
