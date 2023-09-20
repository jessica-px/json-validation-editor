import { useEffect } from 'react';
import { styled } from 'styled-components';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { DirectoryItem } from '@shared/types';
import { dirDataActions, dirDataSelectors } from '@redux/dirDataSlice';
import { FileNavPanel } from './components/fileNavPanel';
import { WarningPanel } from './components/warningPanel';
import { JsonPanel } from './components/jsonPanel';
import { FileTabTray } from './components/fileTabs';

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

export const ProjectPage = () => {
  const dispatch = useAppDispatch();
  const directoryPath = useAppSelector(dirDataSelectors.selectDirectoryPath);

  useEffect(() => {
    electronApi.getDirData(directoryPath)
      .then((res) => {
        if (res.success) {
          const returnedDirItems: DirectoryItem[] = res.body;
          returnedDirItems.forEach(item => dispatch(dirDataActions.addOne(item)));
        }
        // upgrade this to an "addMany" action, for performance
      });

  }, []);

  return (
    <Layout>
      <Panels>
        <FileNavPanel />
        <FilePanelStyle>
          <FileTabTray />
          <JsonPanel />
        </FilePanelStyle>
        <WarningPanel />
      </Panels>
    </Layout>
  )
}
