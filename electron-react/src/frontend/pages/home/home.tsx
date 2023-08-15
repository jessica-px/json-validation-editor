import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux'
import { DirectoryItem } from '@shared/types';
import { dirDataActions } from '@redux/dirDataSlice';
import { FileNavPanel } from './fileNavPanel';
import { WarningPanel } from './warningPanel';
import { JsonPanel } from './jsonPanel';
import { FileTabTray } from './fileTabs';

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
