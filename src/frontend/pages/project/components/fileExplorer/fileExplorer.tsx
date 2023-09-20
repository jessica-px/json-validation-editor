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

const getTypeSortValue = (dirItem1: DirectoryItem, dirItem2: DirectoryItem): number => {
  if (dirItem1.type === 'dir' && dirItem2.type === 'file') {
    return -1;
  } else if (dirItem1.type === 'file' && dirItem2.type === 'dir') {
    return 1;
  } else {
    return 0;
  }
}

export const FileExplorer = (props: FileExplorerProps): React.ReactElement => {
  const indentAmount = 10;
  const sortedContents = props.contents.sort((a, b) => {
    const alphaSortValue = a.name.localeCompare(b.name);
    const typeSortValue = getTypeSortValue(a, b);
    return typeSortValue || alphaSortValue;
  })

  return (
    <FileExplorerContainer>
      {
        !!sortedContents && sortedContents.map(dirItem => {

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
