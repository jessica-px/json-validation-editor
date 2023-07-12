import { useEffect, useRef } from 'react';
import AceEditor from "react-ace";
import { styled } from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../../frontend/redux/hooks';
import { actions, selectors } from '../../../frontend/redux/dirDataSlice';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

const JsonPanelStyle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const JsonPanel = () => {
  const dispatch = useAppDispatch();
  const editorRef = useRef();

  const selectedLineNumber = useAppSelector(selectors.selectSelectedLineNumber)
  const selectedFile = useAppSelector(selectors.selectSelectedFile)

  useEffect(() => {
    goToLine(selectedLineNumber);
  }, [selectedLineNumber])

  const errorsToAnnotations = () => {
    if (!selectedFile) {
      return [];
    }
    return selectedFile.jsonErrors.map(error => ({
      row: error.lineNumber, column: 0, type: 'error', text: error.message
    }))
  }

  const errorsToMarkers = () => {
    if (!selectedFile) {
      return [];
    }
    return selectedFile.jsonErrors.map(error => ({
      startRow: error.lineNumber, startCol: 0, endRow: error.lineNumber, endCol: 2000, className: 'error-marker', type: 'fullLine'
    }))
  }

  const onChange = (newValue: string) => {
    const oldValue = selectedFile.content;
    if (oldValue !== newValue) {
      dispatch(actions.updateFile({
        path: selectedFile.path,
        newContent: newValue
      }))
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
      {!!selectedFile && (
        <AceEditor
          mode="java"
          ref={editorRef}
          theme="twilight"
          onChange={onChange}
          debounceChangePeriod={500}
          name="ace-editor"
          editorProps={{ $blockScrolling: true }}
          value={selectedFile.content}
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
