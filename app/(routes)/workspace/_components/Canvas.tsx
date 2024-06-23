import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { Excalidraw, MainMenu, WelcomeScreen } from '@excalidraw/excalidraw';
import { FILE } from '../../dashboard/_components/FileList';

function Canvas({
	onSaveTrigger,
	fileId,
	fileData,
}: {
	onSaveTrigger: any;
	fileId: any;
	fileData: FILE;
}) {
	const [whiteBoardData, setWhiteBoardData] = useState<any>();

	const updateWhiteboard = useMutation(api.files.updateWhiteboard);

	useEffect(() => {
		onSaveTrigger && saveWhiteboard();
	}, [onSaveTrigger]);

	const saveWhiteboard = () => {
		updateWhiteboard({
			_id: fileId,
			whiteboard: JSON.stringify(whiteBoardData),
		}).then(
			() => {
				toast.success('Canvas saved successfully');
			},
			(e) => {
				toast.error('Canvas failed to save');
			}
		);
	};

	return (
		<div className='h-5/6'>
			{fileData && (
				<Excalidraw
					theme='light'
					initialData={{
						elements: fileData?.whiteboard && JSON.parse(fileData.whiteboard),
					}}
					onChange={(excalidrawElements, appState, files) =>
						setWhiteBoardData(excalidrawElements)
					}
					UIOptions={{
						canvasActions: {
							changeViewBackgroundColor: false,
							toggleTheme: false,
							loadScene: false,
						},
					}}
				>
					<MainMenu>
						<MainMenu.DefaultItems.SaveAsImage />
						<MainMenu.DefaultItems.Export />
						<MainMenu.DefaultItems.ClearCanvas />
					</MainMenu>

					<WelcomeScreen>
						<WelcomeScreen.Hints.MenuHint />
						<WelcomeScreen.Hints.ToolbarHint />
					</WelcomeScreen>
				</Excalidraw>
			)}
		</div>
	);
}

export default Canvas;
