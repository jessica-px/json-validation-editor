import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { JsonError } from '@shared/validateJson/validateJson';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { dirDataSelectors } from '@redux/dirDataSlice';
import { tabsActions } from '@redux/tabsSlice';

const WarningPanelStyle = styled.div`
  background-color: ${(props) => props.theme.dark200};
  border-right: 1px ${(props) => props.theme.dark300} solid;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 230px;
  padding: 12px;
  font-size: ${(props) => props.theme.fontSizeSmall};
  overflow: scroll;
`;

const PanelHeader = styled.h4`
  color: ${(props) => props.theme.primaryLight};
  padding: 8px 16px;
  margin: 0;
`

const FileButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.dark200};
  color: ${(props) => props.theme.dark600};
  padding: 8px 16px;
  text-align: left;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.dark300};
  }
`

const FileInfoContainter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ErrorTextMessage = styled.div`
  text-align: left;
  color: #ee6e6e;
`

const ErrorTextLineNumber = styled.div`
  text-align: left;
  color: ${(props) => props.theme.dark600};
  min-width: 32px;
`

const ErrorTextContainer = styled.button`
  display: flex;
  flex-direction: row;
  padding: 4px 0 4px 16px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.dark200};
  &:hover {
    background-color: ${(props) => props.theme.dark300};
  }
`

type ErrorTextProps = {
  lineNumber: number,
  message: string,
  onClick: () => void
}

const ErrorText = ({ lineNumber, message, onClick }: ErrorTextProps) => {
  return (
    <ErrorTextContainer onClick={() => onClick()}>
      <ErrorTextLineNumber>{lineNumber + 1 + ': '}</ErrorTextLineNumber>
      <ErrorTextMessage>{message}</ErrorTextMessage>
    </ErrorTextContainer>
  )
}

type FileInfoProps = {
  fileName: string,
  filePath: string,
  errors: JsonError[]
}

const FileInfo = ({ fileName, filePath, errors }: FileInfoProps) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const symbol = isOpen ? '▼' : '▶';

  const setSelectedLineNumber = (lineNumber: number) => {
    dispatch(tabsActions.setSelectedLineNumber(lineNumber))
  }

  return (
    <FileInfoContainter>
      <FileButton
        key={fileName}
        onClick={() => setIsOpen(!isOpen)}
      >
        {`${symbol} ${fileName} (${errors.length})`}
      </FileButton>
      {isOpen && errors.map((error, i) => (
        <ErrorText
          key={i}
          lineNumber={error.lineNumber}
          message={error.message}
          onClick={() => {
            setSelectedLineNumber(error.lineNumber + 1);
            dispatch(tabsActions.setSelectedFile(filePath))
          }}
        />
      ))}
    </FileInfoContainter>
  )
}

export const WarningPanel = () => {
  const [numErrors, setNumErrors] = useState<number>(0);
  const filesWithErrors = useAppSelector(dirDataSelectors.selectAllWithErrors);

  useEffect(() => {
    let numErrorsFound = 0;
    for (const file of filesWithErrors) {
      numErrorsFound += file.jsonErrors.length;
    }
    setNumErrors(numErrorsFound);
  }, [filesWithErrors])

  return (
    <WarningPanelStyle>
      <PanelHeader>Total Errors: {numErrors}</PanelHeader>
      {filesWithErrors
        .filter(file => (
          file.jsonErrors.length > 0
        )).map(file => (
          <FileInfo
            key={file.path}
            fileName={file.name}
            filePath={file.path}
            errors={file.jsonErrors}
          />
        ))
      }
    </WarningPanelStyle>
  )
}
