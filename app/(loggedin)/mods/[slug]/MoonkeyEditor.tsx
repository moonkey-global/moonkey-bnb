'use client';
import { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';

function MoonkeyEditor() {
	const monacoRef = useRef(null);
	const editorRef = useRef(null);
	function handleEditorDidMount(editor: any, monaco: any) {
		editorRef.current = editor;
	}
	function showValue() {
		if (!editorRef.current) return;
		// @ts-ignore
		alert(editorRef.current.getValue());
	}
	// function handleEditorWillMount(monaco) {
	// monacoRef.current = monaco;
	// monacoRef.current.languages.register({ id: 'remix-solidity' });
	// }
	return (
		<div className='flex items-center justify-center'>
			{/* <button onClick={showValue}>Show</button> */}
			<Editor
				height='70vh'
				width='60vw'
				theme='light'
				defaultValue='// SPX'
				defaultLanguage='javascript'
				onMount={handleEditorDidMount}
			/>
			{/* <Editor
				width='100%'
				path={props.currentFile}
				language={
					editorModelsState[props.currentFile]
						? editorModelsState[props.currentFile].language
						: 'text'
				}
				onMount={handleEditorDidMount}
				beforeMount={handleEditorWillMount}
				options={{
					glyphMargin: true,
					readOnly:
						(!editorRef.current || !props.currentFile) &&
						editorModelsState[props.currentFile]?.readOnly,
				}}
				defaultValue={defaultEditorValue}
			/> */}
		</div>
	);
}

export default MoonkeyEditor;
