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
	const defaultEditorValue = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyPepe is ERC20, ERC20Burnable, Ownable {
	constructor() ERC20("MyPepe", "PEPE") {
		_mint(msg.sender, 1000000 * 10 ** decimals());
	}

	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	}
}\n`;
	return (
		<div className='flex items-center justify-center'>
			{/* <button onClick={showValue}>Show</button> */}
			<Editor
				height='70vh'
				width='60vw'
				theme='light'
				defaultValue={defaultEditorValue}
				defaultLanguage='sol'
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
