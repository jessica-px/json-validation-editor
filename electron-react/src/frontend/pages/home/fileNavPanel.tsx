import { styled } from 'styled-components';
import { FileExplorer }from './fileExplorer/fileExplorer';
import { dirDataSelectors } from '@redux/dirDataSlice';
import { useAppSelector } from '@redux/hooks';

const FileNavPanelStyle = styled.div`
  background-color: ${(props) => props.theme.dark200};
  border-right: 1px ${(props) => props.theme.dark300} solid;
  display: flex;
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

type FileNavPanelProps = {
  jsonDirectoryPath: string
}

export const FileNavPanel = (props: FileNavPanelProps) => {
  const topLevelItems = useAppSelector(dirDataSelectors.selectAllItemsAtPath(props.jsonDirectoryPath))

  return (
    <FileNavPanelStyle>
      <ListHeader>my-jsons</ListHeader>
      <FileExplorer contents={topLevelItems} />
    </FileNavPanelStyle>
  )
}
