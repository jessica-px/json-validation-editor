import { IpcMainInvokeEvent } from 'electron';

export enum ApiKey {
  selectDirectory = "selectDirectory",
  getDirData = "getDirData"
}

export type BackendApi = {
  [Property in ApiKey]: (event: IpcMainInvokeEvent, ...args: any[]) => any;
};

export type FrontendApi = {
  [Property in ApiKey]: Function;
};
