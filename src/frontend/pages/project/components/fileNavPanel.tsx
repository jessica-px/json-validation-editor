import { styled } from 'styled-components';
import { FileExplorer }from './fileExplorer/fileExplorer';
import { dirDataSelectors } from '@redux/dirDataSlice';
import { useAppSelector } from '@redux/hooks';

const FileNavPanelWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`

const FileNavPanelDraggableHeader = styled.div`
  background-color: ${(props) => props.theme.dark300};
  height: ${(props) => props.theme.titleBarHeight};
  width: 100%;
  -webkit-app-region: drag;
`;

const FileNavPanelStyle = styled.div`
  background-color: ${(props) => props.theme.dark200};
  border-right: 1px ${(props) => props.theme.dark300} solid;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  width: 230px;
  padding: 12px;
  font-size: ${(props) => props.theme.fontSizeSmall};
  overflow: scroll;
`;

const ListHeader = styled.h4`
  color: ${(props) => props.theme.primaryLight};
  padding: 8px 16px;
  margin: 0;
`

export const FileNavPanel = () => {
  const directoryPath = useAppSelector(dirDataSelectors.selectDirectoryPath);
  const topLevelItems = useAppSelector(dirDataSelectors.selectAllItemsAtPath(directoryPath));
  const directoryName = directoryPath.split('/').pop();

  return (
    <FileNavPanelWrapper>
      <FileNavPanelDraggableHeader/>
      <FileNavPanelStyle>
        <ListHeader>{directoryName}</ListHeader>
        <FileExplorer contents={topLevelItems} />
      </FileNavPanelStyle>
    </FileNavPanelWrapper>
  )
}
