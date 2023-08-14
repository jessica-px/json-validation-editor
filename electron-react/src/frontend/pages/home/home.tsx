import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux'
import { DirectoryItem } from '@shared/types';
import { dirDataActions } from '@redux/dirDataSlice';
import { FileNavPanel } from './fileNavPanel';
import { WarningPanel } from './warningPanel';
import { JsonPanel } from './jsonPanel';
import { FileTabTray } from './fileTabs';

const TitleBar = styled.div`
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.theme.dark100};
  -webkit-app-region: drag;
`;

const Layout = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const Panels = styled.div`
  display: flex;
  max-height: calc(100vh - 30px);
  flex-direction: row;
`

export type FileReturnType = {
  name: string,
  path: string,
  content: string
}

const FilePanelStyle = styled.div`
  width: 100%;
`

export const HomePage = () => {
  const dispatch = useDispatch();
  const [jsonDirectoryPath] = useState('/Users/themanager/Desktop/jsons');

  useEffect(() => {
    electronApi.getDirData(jsonDirectoryPath)
      .then((returnedDirItems: DirectoryItem[]) => {
        // upgrade this to an "addMany" action, for performance
        returnedDirItems.forEach(item => dispatch(dirDataActions.addOne(item)))
      });

  }, []);

  return (
    <Layout>
      <TitleBar />
      <Panels>
        <FileNavPanel jsonDirectoryPath={jsonDirectoryPath} />
        <FilePanelStyle>
          <FileTabTray />
          <JsonPanel />
        </FilePanelStyle>
        <WarningPanel />
      </Panels>
    </Layout>
  )
}
