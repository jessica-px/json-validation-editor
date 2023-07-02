import { FileData, HierarchicalFileData, HierarchicalFileDataItem } from "./fileData.types"

export const getFileDataHierarchy = (fileData: FileData): HierarchicalFileData => {
  const hierarchicalData: HierarchicalFileData = {};

  Object.keys(fileData).forEach(filePath => {
    const nodes = filePath.split('/');

    nodes.reduce((r: HierarchicalFileData, node, i) => {
      // if final node, use string
      if (i === nodes.length-1) {
        return r[node] = filePath;
      }
      // else build object
      return r[node] || (r[node] = {})
    }, hierarchicalData)

  })

  return hierarchicalData;
}
