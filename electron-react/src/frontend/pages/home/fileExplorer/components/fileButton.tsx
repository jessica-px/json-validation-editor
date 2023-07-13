import { useEffect, useState } from 'react';
import { styled } from "styled-components";
import { actions, selectors } from '@redux/dirDataSlice';
import { useAppSelector, useAppDispatch } from '@redux/hooks';

const FileButtonStyle = styled.button<{ selected: boolean, indent: number}>`
  color: ${(props) => props.theme.dark600};
  text-align: left;
  margin: 0;
  padding: 4px 0 4px 6px;
  border: none;
  background-color: ${(props) => props.selected ? props.theme.dark300 : props.theme.dark200};
  &:hover {
    background-color: ${(props) => props.theme.dark300};
    border-radius: 5px;
  }
`

type FileButtonProps = {
  indent: number,
  path: string
}

export const FileButton = (props: FileButtonProps) => {
  const dispatch = useAppDispatch();
  const [buttonLabel, setButtonLabel] = useState('');
  const selectedFile = useAppSelector(selectors.selectSelectedFile);
  const fileData = useAppSelector((state) => selectors.selectFileById(state, props.path));
  const isSelected = selectedFile && selectedFile.path === props.path;

  // whenever file updates, check to see if we should add/remove button * to show changes
  useEffect(() => {
    const hasChanges = fileData.content !== fileData.contentOnDisk;
    setButtonLabel(hasChanges ? `${fileData.name}*` : fileData.name);
  }, [fileData])

  return (
    <FileButtonStyle
      indent={props.indent}
      selected={isSelected}
      onClick={() => dispatch(actions.setSelectedFile(props.path))}
    >
      {buttonLabel}
    </FileButtonStyle>
  )
}
