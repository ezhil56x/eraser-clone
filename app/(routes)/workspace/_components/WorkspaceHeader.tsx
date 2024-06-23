import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';
import React from 'react';

function WorkspaceHeader({ onSave, fileName }: any) {
	return (
		<div className='p-3 border-b flex justify-between'>
			<div className='flex gap-2 items-center'>
				<Link href='/dashboard' className='flex gap-2 items-center'>
					<Image src={'/logo-1.png'} alt='logo' height={40} width={40} />
				</Link>
				<h2>{fileName}</h2>
			</div>
			<div className='flex items-center gap-4'>
				<Button
					className='h-8 text-[12px] gap-2 bg-red-600 hover:bg-red-700'
					onClick={() => onSave()}
				>
					Save <Save className='h-4 w-4' />
				</Button>
				<Button className='h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700'>
					Share <LinkIcon className='h-4 w-4' />
				</Button>
			</div>
		</div>
	);
}

export default WorkspaceHeader;
