import { IpcMainInvokeEvent } from 'electron';
import { ApiResponse } from './types';

export enum ApiKey {
  saveFile = "saveFile",
  selectDirectory = "selectDirectory",
  getDirData = "getDirData"
}

export type BackendApi = {
  [Property in ApiKey]: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<ApiResponse>;
};

export type FrontendApi = {
  [Property in ApiKey]: (...args: any[]) => Promise<ApiResponse>;
};
