import { IpcMainInvokeEvent } from 'electron';

export enum ApiKey {
  getFilesInDir = "getFilesInDir",
  selectDirectory = "selectDirectory"
}

export type BackendApi = {
  [Property in ApiKey]: (event: IpcMainInvokeEvent, ...args: any[]) => any;
};

export type FrontendApi = {
  [Property in ApiKey]: Function;
};
