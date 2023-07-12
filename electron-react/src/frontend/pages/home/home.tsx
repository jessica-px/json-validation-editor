import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux'
import { DirectoryItem } from '@shared/types';
import { actions } from '@redux/dirDataSlice';
import { FileNavPanel } from './fileNavPanel';
import { WarningPanel } from './warningPanel';
import { JsonPanel } from './jsonPanel';

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
  const dispatch = useDispatch();
  const [jsonDirectoryPath] = useState('/Users/themanager/Desktop/jsons');

  useEffect(() => {
    electronApi.getDirData(jsonDirectoryPath)
      .then((returnedDirItems: DirectoryItem[]) => {
        // upgrade this to an "addMany" action, for performance
        returnedDirItems.forEach(item => dispatch(actions.addOne(item)))
      });

  }, []);

  return (
    <Layout>
      <TitleBar />
      <Panels>
        <FileNavPanel jsonDirectoryPath={jsonDirectoryPath} />
        <JsonPanel />
        <WarningPanel />
      </Panels>
    </Layout>
  )
}
