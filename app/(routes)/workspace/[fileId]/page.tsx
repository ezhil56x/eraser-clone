'use client';
import React, { useEffect, useState } from 'react';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import Editor from '../_components/Editor';

import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';

function Workspace({ params }: any) {
	const [triggerSave, setTriggerSave] = useState(false);
	const [fileData, setFileData] = useState<FILE | any>();

	useEffect(() => {
		params.fileId && getFileData().then((data) => setFileData(data));
	}, []);

	const convex = useConvex();

	const getFileData = async () => {
		const result = await convex.query(api.files.getFileById, {
			_id: params.fileId,
		});
		return result;
	};

	return (
		<div>
			<WorkspaceHeader
				onSave={() => setTriggerSave(!triggerSave)}
				fileName={fileData?.fileName || 'Untitled'}
			/>

			{/* Workspace Layout */}
			<div className='grid grid-cols-1 md:grid-cols-2'>
				{/* Document */}
				<div className='h-screen pt-6'>
					<Editor
						onSaveTrigger={triggerSave}
						fileId={params.fileId}
						fileData={fileData}
					/>
				</div>

				{/* Whiteboard/canvas */}
				<div className='h-screen border-l pt-6'>
					<Canvas
						onSaveTrigger={triggerSave}
						fileId={params.fileId}
						fileData={fileData}
					/>
				</div>
			</div>
		</div>
	);
}

export default Workspace;
