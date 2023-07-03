import { useContext } from 'react';
import { styled } from 'styled-components';
import { FileContext } from './fileContext';
import { FileData } from '../../utils/fileData.types';
import { getFileDataHierarchy } from '../../utils/getFileDataHierarchy';
import { FileExplorer }from './fileExplorer/fileExplorer';

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

const DirHeader = styled.div<{ indent: number}>`
  padding-left: ${(props) => `${props.indent}px`};
`

const getFileDisplayName = (filePath: string, fileData: FileData) => {
  if (fileData[filePath].hasChanges) {
    return fileData[filePath].name + " *";
  }
  return fileData[filePath].name;
}

export const FileNavPanel = () => {
  const { fileData, selectedFile, setSelectedFile } = useContext(FileContext);
  const fileHierarchy = getFileDataHierarchy(fileData);

  return (
    <FileNavPanelStyle>
      <ListHeader>my-jsons</ListHeader>
      <FileExplorer hierarchicalFileData={fileHierarchy} indentAmount={12} depth={1}/>
    </FileNavPanelStyle>
  )
}
