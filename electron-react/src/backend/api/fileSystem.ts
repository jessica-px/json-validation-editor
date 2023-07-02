import { dialog, IpcMainInvokeEvent } from 'electron';
import { promises as fsp } from 'fs';

export async function openFile () {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }
}

export async function selectDirectory () {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  if (!canceled) {
    return filePaths[0]
  }
}

export type FileReturnType = {
  name: string,
  path: string,
  content: string
}

export const getFilesInDir = async (_: IpcMainInvokeEvent, ...args: string[]): Promise<FileReturnType[]> => {
  const directoryName = args[0];

  const recursiveGetFilesInDir = async (dirName: string): Promise<FileReturnType[]> => {
    let files: FileReturnType[] = [];
    const items = await fsp.readdir(dirName, { withFileTypes: true,  });
    for (const item of items) {
      if (item.isDirectory()) {
        files = [
          ...files,
          ...(await recursiveGetFilesInDir(`${dirName}/${item.name}`)),
        ];
      } else if (item.name.includes('.json')) {
        const filePath = `${dirName}/${item.name}`;
        const fileData = await fsp.readFile(filePath);
        files.push({
          name: item.name,
          path: filePath,
          content: fileData.toString()
        })
      } else {
        continue;
      }
    }
    return files;
  }

  const fileNames = await recursiveGetFilesInDir(directoryName);
  return fileNames;
};
