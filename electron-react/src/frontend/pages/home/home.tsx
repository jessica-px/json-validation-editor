import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { FileNavPanel } from './fileNavPanel';
import { WarningPanel } from './warningPanel';
import { FileContext } from './fileContext';
import { JsonPanel } from './jsonPanel';
import { FileData } from '../../utils/fileData.types';
import { getJsonErrors } from '../../utils/validateJson/validateJson';

const TitleBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.theme.dark100};
  -webkit-app-region: drag;
`;

const Layout = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`

const Panels = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`

export type FileReturnType = {
  name: string,
  path: string,
  content: string
}

export const HomePage = () => {
  const [jsonDirectory] = useState('/Users/themanager/Desktop/jsons');
  const [fileData, setFileData] = useState<FileData>({});
  const [fileDataOnDisk, setFileDataOnDisk] = useState<FileData>({});
  const [selectedLine, setSelectedLine] = useState(0);
  const [selectedFile, setSelectedFile] = useState<string|null>(null);

  useEffect(() => {
    const newData: FileData = {};

    electronApi.getFilesInDir(jsonDirectory)
      .then((returnedFiles: FileReturnType[]) => {
        returnedFiles.forEach(file => {
          newData[file.path] = {
            name: file.name,
            path: file.path,
            jsonString: file.content,
            jsonErrors: getJsonErrors(file.content),
            hasChanges: false
          }
        })
        setFileData(newData);
        setFileDataOnDisk(newData);
      });

  }, []);

  const updateFileContent = (fileName: string, newContent: string) => {
    const contentOnDisk = fileDataOnDisk[fileName].jsonString;

    const newDataItem = {
      ...fileData[fileName],
      jsonString: newContent,
      jsonErrors: getJsonErrors(newContent),
      hasChanges: newContent !== contentOnDisk
    };
    const newFileData = { ...fileData, [fileName]: newDataItem };

    setFileData(newFileData);
  }

  return (
    <FileContext.Provider value={{
      fileData,
      setFileData,
      selectedFile,
      setSelectedFile,
      selectedLine,
      setSelectedLine,
      jsonDirectory
    }}>
      <Layout>
        <TitleBar />
        <Panels>
          <FileNavPanel />
          <JsonPanel updateFileContent={updateFileContent}/>
          <WarningPanel />
        </Panels>
      </Layout>
    </FileContext.Provider>
  )
}
