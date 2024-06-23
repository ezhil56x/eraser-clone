import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Header() {
	return (
		<header className='bg-black border-b-2 border-gray-800'>
			<div className='mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8'>
				<Link href='/'>
					<Image src='/logo-1.png' alt='logo' width={50} height={50} />
				</Link>

				<div className='flex flex-1 items-center justify-end md:justify-end'>
					<div className='flex items-center gap-4'>
						<div className='sm:flex sm:gap-4'>
							<LoginLink className='block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:text-slate-800/75 focus:outline-none sm:w-auto'>
								Sign In
							</LoginLink>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
