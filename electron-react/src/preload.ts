import { contextBridge, ipcRenderer } from 'electron';
import { FrontendApi, ApiKey } from './shared/api';

const frontendApi: FrontendApi = {
  [ApiKey.selectDirectory]: () => ipcRenderer.invoke(ApiKey.selectDirectory),
  [ApiKey.getDirData]: (dirName: string) => ipcRenderer.invoke(ApiKey.getDirData, dirName),
}

contextBridge.exposeInMainWorld('electronApi', frontendApi);
