import { useState, useContext } from 'react';
import { FileContext } from '../../fileContext';
import { styled } from "styled-components";

const DirectoryButtonStyle = styled.button<{ indent: number}>`
  color: ${(props) => props.theme.dark600};
  text-align: left;
  border: none;
  border-radius: 5px;
  margin: 0;
  margin-left: ${(props) => `${props.indent - 4}px`};
  padding: 4px;
  background-color: ${(props) => props.theme.dark200};
  color: ${(props) => props.theme.dark600};
  font-weight: "bold";

  &:hover {
    background-color: ${(props) => props.theme.dark300};
  }
`

type DirectoryButtonProps = {
  indent: number,
  directoryName: string,
  nestedFileExplorer: React.ReactElement
}

export const DirectoryButton = (props: DirectoryButtonProps): React.ReactElement => {
  const { selectedFile } = useContext(FileContext);
  const [isOpen, setIsOpen] = useState(true);
  const arrow = isOpen ? '▼' : '▶';
  const label = `${arrow} 📁 ${props.directoryName}`;

  return (
    <>
      <DirectoryButtonStyle
        indent={props.indent}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </DirectoryButtonStyle>
      {isOpen && props.nestedFileExplorer}
    </>
  )
}
