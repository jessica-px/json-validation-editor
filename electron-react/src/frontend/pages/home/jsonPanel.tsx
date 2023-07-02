import { useContext, useEffect, useRef } from 'react';
import AceEditor from "react-ace";
import { styled } from 'styled-components';
import { FileContext } from './fileContext';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

const JsonPanelStyle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`

type JsonPanelProps = {
  updateFileContent: (fileName: string, newContent: string) => void
}

export const JsonPanel = ({ updateFileContent }: JsonPanelProps) => {
  const { selectedFile, fileData, selectedLine } = useContext(FileContext);
  const editorRef = useRef();

  const fileDataItem = fileData[selectedFile];

  useEffect(() => {
    goToLine(selectedLine);
  }, [selectedLine])

  const errorsToAnnotations = () => {
    if (!fileDataItem) {
      return [];
    }
    return fileDataItem.jsonErrors.map(error => ({
      row: error.lineNumber, column: 0, type: 'error', text: error.message
    }))
  }

  const errorsToMarkers = () => {
    if (!fileDataItem) {
      return [];
    }
    return fileDataItem.jsonErrors.map(error => ({
      startRow: error.lineNumber, startCol: 0, endRow: error.lineNumber, endCol: 2000, className: 'error-marker', type: 'fullLine'
    }))
  }

  const onChange = (newValue: string) => {
    // only update if it's actually different
    const oldValue = fileData[selectedFile].jsonString;
    if (oldValue !== newValue) {
      updateFileContent(selectedFile, newValue);
    }
  }

  const goToLine = (lineNumber: number) => {
    if (editorRef.current) {
      (editorRef as any)?.current?.editor.gotoLine(lineNumber)
    }
  }

  return (
    <JsonPanelStyle>
      {!selectedFile && <div>Select a file</div>}
      {selectedFile && !!fileDataItem && (
        <AceEditor
          mode="java"
          ref={editorRef}
          theme="twilight"
          onChange={onChange}
          debounceChangePeriod={500}
          name="ace-editor"
          editorProps={{ $blockScrolling: true }}
          value={fileDataItem.jsonString}
          width='100%'
          height='100%'
          focus={true}
          cursorStart={5}
          wrapEnabled={true}
          setOptions={{
            placeholder: "This file is empty!"
          }}
          style={{
            backgroundColor: '#1a1625'
          }}
          annotations={errorsToAnnotations()}
          markers={errorsToMarkers() as any}
        />
      )}
    </JsonPanelStyle>
  )
}
