import { styled } from 'styled-components';
import { useAppDispatch } from '@redux/hooks';
import { dirDataActions } from '@redux/dirDataSlice';

const Layout = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
`

const CenteredContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const DraggableHeader = styled.div`
  background-color: ${(props) => props.theme.dark300};
  height: ${(props) => props.theme.titleBarHeight};
  width: 100%;
  -webkit-app-region: drag;
`;

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const onClickSelectDir = async () => {
    const res = await electronApi.selectDirectory();
    if (res.success) {
      const dirPath = res.body as string;
      dispatch(dirDataActions.setDirectoryPath(dirPath));
    }
  }

  return (
    <Layout>
      <DraggableHeader/>
      <CenteredContent>
        <button onClick={onClickSelectDir}>Select Directory</button>
      </CenteredContent>
    </Layout>
  )
}
