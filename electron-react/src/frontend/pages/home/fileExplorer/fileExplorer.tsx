import { styled } from "styled-components";
import { selectors } from '@redux/dirDataSlice';
import { useAppSelector } from '@redux/hooks'
import { DirectoryItem } from "@shared/types";
import { FileButton } from './components/fileButton';
import { DirectoryButton } from './components/directoryButton';

const FileExplorerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

type FileExplorerProps = {
  contents: DirectoryItem[],
  depth: number,
  indentAmount: number
};

export const FileExplorer = (props: FileExplorerProps): React.ReactElement => {
  return (
    <FileExplorerContainer>
      {
        !!props.contents && props.contents.map(dirItem => {
          const indent = props.depth * props.indentAmount;

          if (!dirItem) {
            return;
          } else if (dirItem.type === 'file') {
            return <FileButton
              key={dirItem.path}
              path={dirItem.path}
              fileData={dirItem}
              indent={indent}
            />;
          } else {
            const children = useAppSelector(state => selectors.selectAllChildren(state, dirItem.path))

            return (
              <DirectoryButton
                key={dirItem.path}
                path={dirItem.path}
                directoryName={dirItem.name}
                indent={indent}
                nestedFileExplorer={
                  <FileExplorer contents={children} depth={props.depth + 1} indentAmount={props.indentAmount}/>
                }
              />
            )
          }
        })
      }
    </FileExplorerContainer>
  )
};
