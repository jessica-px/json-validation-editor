import { createContext } from 'react';
import { FileDataItem } from '../../utils/fileData.types';

type FileDataContextType = {
  fileData: {[key: string]: FileDataItem},
  setFileData: React.Dispatch<React.SetStateAction<{[key: string]: FileDataItem}>>
  selectedFile: string|null,
  setSelectedFile: React.Dispatch<React.SetStateAction<string>>
  selectedLine: number,
  setSelectedLine: React.Dispatch<React.SetStateAction<number>>,
  jsonDirectory: string
}

export const FileContext = createContext<FileDataContextType|null>(null);
