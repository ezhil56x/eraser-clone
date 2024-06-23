'use client';
import React, { useEffect, useRef, useState } from 'react';

import EditorJS from '@editorjs/editorjs';

import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Paragraph from '@editorjs/paragraph';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';

const rawDocument = {
	time: 1550476186479,
	blocks: [
		{
			data: {
				level: 1,
			},
			id: '1',
			type: 'paragraph',
		},
	],
	version: '2.8.1',
};

function Editor({
	onSaveTrigger,
	fileId,
	fileData,
}: {
	onSaveTrigger: any;
	fileId: any;
	fileData: FILE;
}) {
	const ref = useRef<EditorJS>();
	const updateDocument = useMutation(api.files.updateDocument);

	useEffect(() => {
		fileData && initEditor();
	}, [fileData]);

	useEffect(() => {
		onSaveTrigger && onSaveDocument();
	}, [onSaveTrigger]);

	const initEditor = () => {
		const editor = new EditorJS({
			holder: 'editorjs',
			data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
			tools: {
				header: {
					class: Header,
					config: {
						placeholder: 'Enter a header',
					},
				},
				list: {
					class: List,
					inlineToolbar: true,
					config: {
						defaultStyle: 'unordered',
					},
				},
				checklist: {
					class: Checklist,
					inlineToolbar: true,
				},
				paragraph: {
					class: Paragraph,
					inlineToolbar: true,
					config: {
						placeholder: 'Enter text or type "/" for commands',
					},
				},
			},
		});
		ref.current = editor;
	};

	const onSaveDocument = () => {
		if (ref.current) {
			ref.current.save().then((outputData) => {
				console.log('Article data: ', outputData);
				updateDocument({
					_id: fileId,
					document: JSON.stringify(outputData),
				}).then(
					() => {
						toast.success('Document saved successfully');
					},
					(e) => {
						toast.error('Document failed to save');
					}
				);
			});
		}
	};

	return (
		<div>
			<div id='editorjs' className='ml-10'></div>
		</div>
	);
}

export default Editor;
