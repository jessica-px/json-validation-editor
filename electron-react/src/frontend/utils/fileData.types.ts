import { JsonError } from './validateJson/validateJson';

export type FileDataItem = {
  name: string,
  path: string,
  jsonString: string,
  jsonErrors: JsonError[],
  hasChanges: boolean
}

export type FileData = {
  [key: string]: FileDataItem
}

export type HierarchicalFileDataItem = {
  fileName: string,
  parentNodes: string[]
}

export type HierarchicalFileData = {
  [key: string]: string | HierarchicalFileData
}
