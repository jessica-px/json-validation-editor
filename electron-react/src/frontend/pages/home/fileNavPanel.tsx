import { useContext } from 'react';
import { styled } from 'styled-components';
import { FileContext } from './fileContext';
import { FileData } from '../../utils/fileData.types';

const FileNavPanelStyle = styled.div`
  background-color: ${(props) => props.theme.dark200};
  border-right: 1px ${(props) => props.theme.dark300} solid;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 230px;
  padding: 12px;
  font-size: ${(props) => props.theme.fontSizeSmall};
`;

const ListHeader = styled.h4`
  color: ${(props) => props.theme.primaryLight};
  padding: 8px 16px;
  margin: 0;
`

const FileButton = styled.button<{ isSelected: boolean }>`
  border: none;
  background-color: ${(props) => props.isSelected ? props.theme.dark300 : props.theme.dark200};
  color: ${(props) => props.theme.dark600};
  padding: 8px 16px;
  text-align: left;
  border-radius: 5px;
  &:hover {
    background-color: ${(props) => props.theme.dark300};
  }
`

const getFileDisplayName = (filePath: string, fileData: FileData) => {
  if (fileData[filePath].hasChanges) {
    return fileData[filePath].name + " *";
  }
  return fileData[filePath].name;
}

export const FileNavPanel = () => {
  const { fileData, selectedFile, setSelectedFile } = useContext(FileContext);

  return (
    <FileNavPanelStyle>
      <ListHeader>my-jsons</ListHeader>
      {Object.keys(fileData).map(filePath => {
        const fileName = fileData[filePath].name;
        return (
          <FileButton
            key={fileName}
            onClick={() => setSelectedFile(filePath)}
            isSelected={selectedFile === filePath}
          >
            {getFileDisplayName(filePath, fileData)}
          </FileButton>
        )
      })}
    </FileNavPanelStyle>
  )
}
