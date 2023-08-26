//import {FrontendApi} from '@shared/api';

enum ApiKey {
  saveFile = "saveFile",
  selectDirectory = "selectDirectory",
  getDirData = "getDirData",
}

type FrontendApi = {
  [Property in ApiKey]: (...args: any[]) => Promise<ApiResponse>;
};

declare const electronApi: FrontendApi;
