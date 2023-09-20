import { JsonError } from './validateJson/validateJson';

export type DirFile = {
  type: 'file',
  name: string,
  path: string,
  content: string,
  contentOnDisk: string,
  jsonErrors: JsonError[]
}

export type Directory = {
  type: 'dir',
  name: string,
  path: string,
  childPaths: string[]
}

export type DirectoryItem = Directory | DirFile;

export type HierarchicalFileData = {
  [key: string]: string | HierarchicalFileData
}

export type ApiResponseSuccess = {
  success: true,
  body: any
}

export type ApiResponseError = {
  success: false,
  message: string
}

export type ApiResponse = ApiResponseSuccess | ApiResponseError;
