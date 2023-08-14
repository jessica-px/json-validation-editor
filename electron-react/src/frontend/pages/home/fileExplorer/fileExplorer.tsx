import { styled } from "styled-components";
import { dirDataSelectors } from '@redux/dirDataSlice';
import { useAppSelector } from '@redux/hooks'
import { DirectoryItem } from "@shared/types";
import { FileButton } from './components/fileButton';
import { DirectoryButton } from './components/directoryButton';

const FileExplorerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

type FileExplorerProps = {
  contents: DirectoryItem[]
};

export const FileExplorer = (props: FileExplorerProps): React.ReactElement => {
  const indentAmount = 10;

  return (
    <FileExplorerContainer>
      {
        !!props.contents && props.contents.map(dirItem => {

          if (!dirItem) {
            return;
          } else if (dirItem.type === 'file') {
            return (
              <FileButton
                key={dirItem.path}
                path={dirItem.path}
                indent={indentAmount}
              />
            );
          } else {
            const children = useAppSelector(state => dirDataSelectors.selectAllChildren(state, dirItem.path))

            return (
              <DirectoryButton
                key={dirItem.path}
                path={dirItem.path}
                directoryName={dirItem.name}
                indent={indentAmount}
                nestedFileExplorer={
                  <FileExplorer contents={children} />
                }
              />
            )
          }
        })
      }
    </FileExplorerContainer>
  )
};
