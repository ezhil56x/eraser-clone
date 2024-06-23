import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import { FileListContext } from '@/app/_context/FilesListContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

import moment from 'moment';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Trash2 } from 'lucide-react';

export interface FILE {
	archive: boolean;
	createdBy: string;
	document: string;
	fileName: string;
	teamId: string;
	whiteboard: string;
	_id: string;
	_creationTime: number;
}

function FileList() {
	const { fileList_, setFileList_ } = useContext(FileListContext);
	const [fileList, setFileList] = useState<any>();

	const router = useRouter();

	const { user }: any = useKindeBrowserClient();

	useEffect(() => {
		fileList_ && setFileList(fileList_);
	}, [fileList_]);

	const deleteFile = useMutation(api.files.deleteFile);

	const onFileDelete = async (fileId: any) => {
		deleteFile({ _id: fileId }).then(
			(res) => {
				toast.success('File deleted successfully');
			},
			(e) => {
				toast.error('Failed to delete file');
			}
		);

		const updatedFileList = fileList.filter(
			(file: FILE) => file._id !== fileId
		);
		setFileList(updatedFileList);
	};

	return (
		<div className='mt-10'>
			<div className='overflow-x-auto'>
				<table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
					<thead className='ltr:text-left rtl:text-right'>
						<tr>
							<td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
								File Name
							</td>
							<td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
								Created At
							</td>
							<td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
								Edited At
							</td>
							<td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
								Author
							</td>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-200'>
						{fileList && fileList.length > 0 ? (
							fileList.map((file: FILE, index: number) => (
								<tr key={index} className='odd:bg-gray-50'>
									<td
										className='whitespace-nowrap px-4 py-2 font-medium text-gray-900  cursor-pointer'
										onClick={() => router.push(`/workspace/${file._id}`)}
									>
										{file.fileName}
									</td>
									<td
										className='whitespace-nowrap px-4 py-2 text-gray-700  cursor-pointer'
										onClick={() => router.push(`/workspace/${file._id}`)}
									>
										{moment(file._creationTime).format('DD MMM YYYY')}
									</td>
									<td
										className='whitespace-nowrap px-4 py-2 text-gray-700  cursor-pointer'
										onClick={() => router.push(`/workspace/${file._id}`)}
									>
										{moment(file._creationTime).format('DD MMM YYYY')}
									</td>
									<td className='whitespace-nowrap px-4 py-2 text-gray-700'>
										<Avatar className='h-8 w-8'>
											<AvatarImage src={user?.picture} alt='user' />
											<AvatarFallback>CN</AvatarFallback>
										</Avatar>
									</td>
									<td className='whitespace-nowrap px-4 py-2 text-gray-700'>
										<AlertDialog>
											<AlertDialogTrigger>
												<Trash2 className='h-4 w-4' />
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>
														Are you absolutely sure?
													</AlertDialogTitle>
													<AlertDialogDescription>
														This action cannot be undone. This will permanently
														delete your file from our servers.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction
														onClick={() => onFileDelete(file._id)}
														className='bg-blue-500 hover:bg-blue-600'
													>
														Confirm
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									</td>
								</tr>
							))
						) : (
							<tr className='odd:bg-gray-50'>
								<td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
									No Files Found
								</td>
								<td className='whitespace-nowrap px-4 py-2 text-gray-700'></td>
								<td className='whitespace-nowrap px-4 py-2 text-gray-700'></td>
								<td className='whitespace-nowrap px-4 py-2 text-gray-700'></td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default FileList;
