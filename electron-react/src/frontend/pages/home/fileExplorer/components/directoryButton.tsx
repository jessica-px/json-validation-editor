import { useState, useEffect } from 'react';
import { styled } from "styled-components";
import { selectors } from '@redux/dirDataSlice';
import { useAppSelector } from '@redux/hooks';

const DirectoryButtonStyle = styled.button<{ indent: number}>`
  color: ${(props) => props.theme.dark600};
  text-align: left;
  border: none;
  border-radius: 5px;
  margin: 0;
  padding: 4px;
  background-color: ${(props) => props.theme.dark200};
  color: ${(props) => props.theme.dark600};
  font-weight: "bold";

  &:hover {
    background-color: ${(props) => props.theme.dark300};
  }
`

const DirectoryChildrenContainer = styled.div<{ indent: number}>`
  margin-left: ${(props) => `${props.indent}px`};
  padding-left: 4px;
  border-left: 1px solid ${(props) => props.theme.dark300};
`

type DirectoryButtonProps = {
  indent: number,
  directoryName: string,
  path: string,
  nestedFileExplorer: React.ReactElement
}

export const DirectoryButton = (props: DirectoryButtonProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const arrow = isOpen ? '▼' : '▶';
  const label = `${arrow} 📁 ${props.directoryName}`;

  const selectedFile = useAppSelector(selectors.selectSelectedFile);

  useEffect(() => {
    if (selectedFile && selectedFile.path.includes(props.path)) {
      setIsOpen(true);
    }
  }, [selectedFile])

  return (
    <>
      <DirectoryButtonStyle
        indent={props.indent}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
      </DirectoryButtonStyle>
      <DirectoryChildrenContainer indent={props.indent}>
        {isOpen && props.nestedFileExplorer}
      </DirectoryChildrenContainer>
    </>
  )
}
