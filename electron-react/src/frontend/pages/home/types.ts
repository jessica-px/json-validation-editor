import { JsonError } from '../../utils/validateJson/validateJson';

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
