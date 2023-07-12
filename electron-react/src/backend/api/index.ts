import * as FileSystemAPI from './fileSystem';
import { ApiKey, BackendApi } from '../../shared/api';

const backendApi: BackendApi = {
  [ApiKey.selectDirectory]: FileSystemAPI.selectDirectory,
  [ApiKey.getDirData]: FileSystemAPI.getDirData,
}

export default backendApi;
