import { useContext } from 'react';
import { FileContext } from '../../fileContext';
import { styled } from "styled-components";

const FileButtonStyle = styled.button<{ selected: boolean, indent: number}>`
  color: ${(props) => props.theme.dark600};
  text-align: left;
  margin: 0;
  margin-left: ${(props) => `${props.indent - 8}px`};
  padding: 4px 0 4px 6px;
  border: none;
  border-left: 1px solid ${(props) => props.theme.dark300};
  background-color: ${(props) => props.selected ? props.theme.dark300 : props.theme.dark200};
  &:hover {
    background-color: ${(props) => props.theme.dark300};
    border-radius: 5px;
  }
`

type FileButtonProps = {
  indent: number,
  fileName: string,
  filePath: string
}

export const FileButton = (props: FileButtonProps) => {
  const { selectedFile, setSelectedFile } = useContext(FileContext);

  return (
    <FileButtonStyle
      indent={props.indent}
      selected={props.filePath === selectedFile}
      onClick={() => setSelectedFile(props.filePath)}
    >
      {props.fileName}
    </FileButtonStyle>
  )
}
