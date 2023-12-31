import { useState, useEffect } from 'react';
import { styled } from "styled-components";
import { tabsSelectors } from '@redux/tabsSlice';
import { useAppSelector } from '@redux/hooks';
import { dirDataSelectors } from '@redux/dirDataSlice';

const DirectoryButtonStyle = styled.button<{ indent: number, hasErrors: boolean}>`
  color: ${(props) => props.hasErrors ? props.theme.errorRed : props.theme.dark600};
  text-align: left;
  border: none;
  border-radius: 5px;
  margin: 0;
  padding: 4px;
  background-color: ${(props) => props.theme.dark200};
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

  const selectedFile = useAppSelector(tabsSelectors.selectSelectedFile);
  const filesWithErrors = useAppSelector(dirDataSelectors.selectAllWithErrors);
  const hasErrors = filesWithErrors.some((dirFile) => dirFile.path.includes(props.path));

  useEffect(() => {
    if (selectedFile && selectedFile.path.includes(props.path)) {
      setIsOpen(true);
    }
  }, [selectedFile])

  return (
    <>
      <DirectoryButtonStyle
        indent={props.indent}
        hasErrors={hasErrors}
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
