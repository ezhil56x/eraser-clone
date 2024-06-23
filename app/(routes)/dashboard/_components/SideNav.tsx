import React, { useContext, useEffect, useState } from 'react';

import SideNavTopSection from './SideNavTopSection';
import SideNavBottomSection from './SideNavBottomSection';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

import { TEAM } from './SideNavTopSection';

import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

import { FileListContext } from '@/app/_context/FilesListContext';

function SideNav() {
	const { user } = useKindeBrowserClient();

	const createFile = useMutation(api.files.createFile);
	const deleteFile = useMutation(api.files.deleteFile);

	const [activeTeam, setActiveTeam] = useState<TEAM>();
	const [totalFiles, setTotalFiles] = useState<Number>();

	const { fileList_, setFileList_ } = useContext(FileListContext);

	const convex = useConvex();

	useEffect(() => {
		activeTeam && getFiles();
	}, [activeTeam]);

	const onFileCreate = async (fileName: string) => {
		createFile({
			fileName: fileName,
			teamId: activeTeam?._id || '',
			createdBy: user?.email || '',
			archive: false,
			document: '',
			whiteboard: '',
		}).then(
			(res) => {
				if (res) {
					getFiles();
					toast.success('File created successfully');
				}
			},
			(e) => {
				toast.error('Failed to create file');
			}
		);
	};

	const getFiles = async () => {
		const result = await convex.query(api.files.getFiles, {
			teamId: activeTeam?._id,
		});
		setFileList_(result);
		setTotalFiles(result.length);
	};

	return (
		<div className='h-screen fixed w-72 border-r border-[1px] p-6 flex flex-col'>
			<div className='flex-1'>
				<SideNavTopSection
					user={user}
					setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
				/>
			</div>
			<div>
				<SideNavBottomSection
					totalFiles={totalFiles}
					onFileCreate={onFileCreate}
				/>
			</div>
		</div>
	);
}

export default SideNav;
