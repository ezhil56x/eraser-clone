import { Search, Send } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function Header() {
	const { user }: any = useKindeBrowserClient();
	return (
		<div className='flex justify-end w-full gap-2 items-center'>
			<div className='flex gap-2 items-center border rounded-md p-1'>
				<Search className='h-4 w-4' />
				<input type='text' placeholder='Search' />
			</div>
			<div>
				<Avatar className='h-8 w-8'>
					<AvatarImage src={user?.picture} alt='user' />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</div>
			<Button
				className='gap-2 flex h-8 hover:bg-blue-700 bg-blue-600 text-sm'
				onClick={() => toast.error('Coming Soon!')}
			>
				<Send className='h-4 w-4' />
				Invite
			</Button>
		</div>
	);
}

export default Header;
