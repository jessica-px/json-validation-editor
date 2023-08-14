import { useEffect, useRef } from 'react';
import AceEditor from "react-ace";
import { styled } from 'styled-components';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { dirDataActions } from '@redux/dirDataSlice';
import { tabsSelectors } from '@redux/tabsSlice';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

const JsonPanelStyle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 33px); // chrome tabs height
`

export const JsonPanel = () => {
  const dispatch = useAppDispatch();
  const editorRef = useRef();

  const selectedLineNumber = useAppSelector(tabsSelectors.selectSelectedLineNumber)
  const selectedFile = useAppSelector(tabsSelectors.selectSelectedFile)

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
      dispatch(dirDataActions.updateFile({
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
