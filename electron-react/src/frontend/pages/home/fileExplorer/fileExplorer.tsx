import { styled } from "styled-components";
import { HierarchicalFileData } from "../../../utils/fileData.types";
import { FileButton } from './components/fileButton';
import { DirectoryButton } from './components/directoryButton';

const FileExplorerContainer = styled.div`
  display: flex;
  flex-direction: column;
`

type FileExplorerProps = {
  hierarchicalFileData: HierarchicalFileData,
  depth: number,
  indentAmount: number
};

export const FileExplorer = ({ hierarchicalFileData, indentAmount, depth }: FileExplorerProps): React.ReactElement => {
  const nodes = Object.keys(hierarchicalFileData);

  return (
    <FileExplorerContainer>
      {
        nodes.map(nodeKey => {
          const nodeData = hierarchicalFileData[nodeKey];
          const indent = depth * indentAmount;

          if (typeof nodeData === 'object') {
          // If directory
            return (
              <DirectoryButton
                directoryName={nodeKey}
                indent={indent}
                nestedFileExplorer={
                  <FileExplorer hierarchicalFileData={nodeData} depth={depth + 1} indentAmount={indentAmount}/>
                }
              />
            )
          } else {
          // If filename
            const filePath = nodeData as string;
            return (
              <FileButton fileName={nodeKey} filePath={filePath} indent={indent}/>
            )
          }
        })
      }
    </FileExplorerContainer>
  )
};
