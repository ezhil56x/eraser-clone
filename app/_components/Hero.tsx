import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import React from 'react';

function Hero() {
	return (
		<section className='bg-black'>
			<div className='mx-auto h-screen max-w-screen-xl px-4 py-48 lg:flex lg:h-screen lg:items-top lg:py-48'>
				<div className='mx-auto max-w-xl text-center'>
					<h1 className='text-3xl text-sky-300 font-extrabold sm:text-5xl'>
						Documents & diagrams{' '}
						<strong className='font-extrabold text-white sm:block'>
							{' '}
							for developers{' '}
						</strong>
					</h1>

					<p className='mt-4 sm:text-xl/relaxed text-slate-200'>
						All-in-one markdown editor, collaborative canvas, and
						diagram-as-code builder
					</p>

					<div className='mt-8 flex flex-wrap justify-center gap-4'>
						<RegisterLink className='block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:text-slate-800/75 focus:outline-none sm:w-auto'>
							Try for free 🎉
						</RegisterLink>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
