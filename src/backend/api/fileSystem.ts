import { dialog, IpcMainInvokeEvent } from 'electron';
import { ApiResponse, DirectoryItem } from '@shared/types';
import { promises as fsp } from 'fs';

export async function openFile () {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }
}

export async function saveFile(_: IpcMainInvokeEvent, ...args: string[]): Promise<ApiResponse> {
  const path = args[0];
  const fileContent = args[1];

  try {
    await fsp.writeFile(path, fileContent, 'utf-8');
    const res: ApiResponse = {
      success: true,
      body: path
    };
    return res;
  }
  catch(error) {
    const res: ApiResponse = {
      success: false,
      message: error
    };
    return res;
  }
}

export async function selectDirectory(): Promise<ApiResponse> {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  if (!canceled) {
    return {
      success: true,
      body: filePaths[0]
    }
  } else {
    return {
      success: false,
      message: 'Dialog was canceled'
    }
  }
}

export type FileReturnType = {
  name: string,
  path: string,
  content: string
}

export const getDirData = async (_: IpcMainInvokeEvent, ...args: string[]): Promise<ApiResponse> => {
  const directoryName = args[0];

  const recursiveGetFilesInDir = async (dirName: string): Promise<DirectoryItem[]> => {
    let files: DirectoryItem[] = [];
    const items = await fsp.readdir(dirName, { withFileTypes: true,  });
    for (const item of items) {
      const filePath = `${dirName}/${item.name}`;

      if (item.isDirectory()) {
        const newItem: DirectoryItem = {
          type: 'dir',
          name: item.name,
          path: filePath,
          childPaths: []
        };

        const childFiles = await recursiveGetFilesInDir(filePath);
        const children = childFiles.filter(file => file.path === filePath + '/' + file.name)
        const childPaths = children.map(file => file.path);
        newItem.childPaths = childPaths;

        files = [
          newItem,
          ...files,
          ...childFiles,
        ];
      } else if (item.name.includes('.json')) {
        const fileData = await fsp.readFile(filePath);
        const content = fileData.toString();
        files.push({
          type: 'file',
          name: item.name,
          path: filePath,
          content: content,
          contentOnDisk: content,
          jsonErrors: []
        })
      } else {
        continue;
      }
    }
    return files;
  }

  try {
    const fileNames = await recursiveGetFilesInDir(directoryName);
    return {
      success: true,
      body: fileNames
    };
  } catch(error) {
    return {
      success: false,
      message: error
    };
  }
};
