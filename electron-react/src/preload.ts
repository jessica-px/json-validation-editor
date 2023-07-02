import { contextBridge, ipcRenderer } from 'electron';
import { FrontendApi, ApiKey } from './shared/api';

const frontendApi: FrontendApi = {
  [ApiKey.selectDirectory]: () => ipcRenderer.invoke(ApiKey.selectDirectory),
  [ApiKey.getFilesInDir]: (dirName: string) => ipcRenderer.invoke(ApiKey.getFilesInDir, dirName)
}

contextBridge.exposeInMainWorld('electronApi', frontendApi);
