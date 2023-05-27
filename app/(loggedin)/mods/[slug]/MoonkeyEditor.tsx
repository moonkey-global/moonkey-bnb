'use client';
import { useEffect, useRef } from 'react';
import Editor, { Monaco, loader } from '@monaco-editor/react';
import { monacoTypes } from '@/lib';
// import { loadTypes } from '@/lib/types/web-types';
loader.config({ paths: { vs: 'assets/js/monaco-editor/min/vs' } });
enum MarkerSeverity {
	Hint = 1,
	Info = 2,
	Warning = 4,
	Error = 8,
}

type sourceAnnotation = {
	row: number;
	column: number;
	text: string;
	type: 'error' | 'warning' | 'info';
	hide: boolean;
	from: string; // plugin name
};

type sourceMarker = {
	position: {
		start: {
			line: number;
			column: number;
		};
		end: {
			line: number;
			column: number;
		};
	};
	from: string; // plugin name
	hide: boolean;
};

export type lineText = {
	position: {
		start: {
			line: number;
			column: number;
		};
		end: {
			line: number;
			column: number;
		};
	};
	from?: string; // plugin name
	content: string;
	className: string;
	afterContentClassName: string;
	hide: boolean;
	hoverMessage: monacoTypes.IMarkdownString | monacoTypes.IMarkdownString[];
};

type errorMarker = {
	message: string;
	severity: monacoTypes.MarkerSeverity | 'warning' | 'info' | 'error' | 'hint';
	position: {
		start: {
			line: number;
			column: number;
		};
		end: {
			line: number;
			column: number;
		};
	};
	file: string;
};

export type DecorationsReturn = {
	currentDecorations: Array<string>;
	registeredDecorations?: Array<any>;
};

export type PluginType = {
	on: (plugin: string, event: string, listener: any) => void;
	call: (
		plugin: string,
		method: string,
		arg1?: any,
		arg2?: any,
		arg3?: any,
		arg4?: any
	) => any;
};

export type EditorAPIType = {
	findMatches: (uri: string, value: string) => any;
	getFontSize: () => number;
	getValue: (uri: string) => string;
	getCursorPosition: (offset?: boolean) => number | monacoTypes.IPosition;
	getHoverPosition: (position: monacoTypes.IPosition) => number;
	addDecoration: (
		marker: sourceMarker,
		filePath: string,
		typeOfDecoration: string
	) => DecorationsReturn;
	clearDecorationsByPlugin: (
		filePath: string,
		plugin: string,
		typeOfDecoration: string,
		registeredDecorations: any,
		currentDecorations: any
	) => DecorationsReturn;
	keepDecorationsFor: (
		filePath: string,
		plugin: string,
		typeOfDecoration: string,
		registeredDecorations: any,
		currentDecorations: any
	) => DecorationsReturn;
	addErrorMarker: (errors: errorMarker[], from: string) => void;
	clearErrorMarkers: (
		sources: string[] | { [fileName: string]: any },
		from: string
	) => void;
};

/* eslint-disable-next-line */
export interface EditorUIProps {
	contextualListener: any;
	activated: boolean;
	themeType: string;
	currentFile: string;
	events: {
		onBreakPointAdded: (file: string, line: number) => void;
		onBreakPointCleared: (file: string, line: number) => void;
		onDidChangeContent: (file: string) => void;
		onEditorMounted: () => void;
	};
	plugin: PluginType;
	editorAPI: EditorAPIType;
}

function MoonkeyEditor() {
	const pasteCodeRef = useRef(false);
	const editorRef = useRef(null);
	const monacoRef = useRef<Monaco>(null);
	const currentFileRef = useRef('');
	const currentUrlRef = useRef('');

	const convertToMonacoDecoration = (
		decoration: lineText | sourceAnnotation | sourceMarker,
		typeOfDecoration: string
	) => {
		if (!monacoRef.current) return;
		if (typeOfDecoration === 'sourceAnnotationsPerFile') {
			decoration = decoration as sourceAnnotation;
			return {
				type: typeOfDecoration,
				range: new monacoRef.current.Range(
					decoration.row + 1,
					1,
					decoration.row + 1,
					1
				),
				options: {
					isWholeLine: false,
					glyphMarginHoverMessage: {
						value:
							(decoration.from ? `from ${decoration.from}:\n` : '') +
							decoration.text,
					},
					glyphMarginClassName: `fal fa-exclamation-square text-${
						decoration.type === 'error'
							? 'danger'
							: decoration.type === 'warning'
							? 'warning'
							: 'info'
					}`,
				},
			};
		}
		if (typeOfDecoration === 'markerPerFile') {
			decoration = decoration as sourceMarker;
			let isWholeLine = false;
			if (
				(decoration.position.start.line === decoration.position.end.line &&
					decoration.position.end.column - decoration.position.start.column <
						2) ||
				decoration.position.start.line !== decoration.position.end.line
			) {
				// in this case we force highlighting the whole line (doesn't make sense to highlight 2 chars)
				isWholeLine = true;
			}
			return {
				type: typeOfDecoration,
				range: new monacoRef.current.Range(
					decoration.position.start.line + 1,
					decoration.position.start.column + 1,
					decoration.position.end.line + 1,
					decoration.position.end.column + 1
				),
				options: {
					isWholeLine,
					inlineClassName: `${
						isWholeLine ? 'alert-info' : 'inline-class'
					}  border-0 highlightLine${decoration.position.start.line + 1}`,
				},
			};
		}
		if (typeOfDecoration === 'lineTextPerFile') {
			const lineTextDecoration = decoration as lineText;
			return {
				type: typeOfDecoration,
				range: new monacoRef.current.Range(
					lineTextDecoration.position.start.line + 1,
					lineTextDecoration.position.start.column + 1,
					lineTextDecoration.position.start.line + 1,
					1024
				),
				options: {
					after: {
						content: ` ${lineTextDecoration.content}`,
						inlineClassName: `${lineTextDecoration.className}`,
					},
					afterContentClassName: `${lineTextDecoration.afterContentClassName}`,
					hoverMessage: lineTextDecoration.hoverMessage,
				},
			};
		}
		if (typeOfDecoration === 'lineTextPerFile') {
			const lineTextDecoration = decoration as lineText;
			return {
				type: typeOfDecoration,
				range: new monacoRef.current.Range(
					lineTextDecoration.position.start.line + 1,
					lineTextDecoration.position.start.column + 1,
					lineTextDecoration.position.start.line + 1,
					1024
				),
				options: {
					after: {
						content: ` ${lineTextDecoration.content}`,
						inlineClassName: `${lineTextDecoration.className}`,
					},
					afterContentClassName: `${lineTextDecoration.afterContentClassName}`,
					hoverMessage: lineTextDecoration.hoverMessage,
				},
			};
		}
	};

	// function handleEditorWillMount(monaco) {
	// monacoRef.current = monaco;
	// monacoRef.current.languages.register({ id: 'remix-solidity' });
	// }
	return (
		<div>
			<Editor
				height='100%'
				width='100%'
				theme='vs-dark'
				defaultValue='// SPX'
				defaultLanguage='text'
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
