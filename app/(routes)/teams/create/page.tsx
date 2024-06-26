'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import constant from '@/app/_constant/constant';
import Link from 'next/link';

function CreateTeam() {
	const [teamName, setTeamName] = useState('');
	const createTeam = useMutation(api.teams.createTeam);

	const convex = useConvex();

	const { user }: any = useKindeBrowserClient();
	const router = useRouter();

	const noOfTeams = async () => {
		const result = await convex.query(api.teams.getTeam, {
			email: user?.email,
		});
		return result.length;
	};

	useEffect(() => {
		user && noOfTeams();
	}, [user]);

	const createNewTeam = async () => {
		createTeam({
			teamName: teamName,
			createdBy: user?.email,
		}).then((res) => {
			if (res) {
				toast.success('Team created successfully!');
				router.push('/dashboard');
			}
		});
	};

	const createNewTeamAfterValidation = async () => {
		const teamCount = await noOfTeams();
		if (teamCount >= constant.MAX_TEAMS_PER_USER) {
			toast.error(`You have reached the maximum limit of teams`);
			router.push('/dashboard');
		} else {
			createNewTeam();
		}
	};

	return (
		<div className=' px-6 md:px-16 my-16'>
			<Link href='/dashboard'>
				<Image src='/logo-1.png' alt='logo' width={80} height={80} />
			</Link>

			<div className='flex flex-col items-center mt-8'>
				<h2 className='font-bold text-[40px] py-3'>
					What should we call your team?
				</h2>
				<h2 className='text-gray-500'>
					You can always change this later from settings.
				</h2>
				<div className='mt-7 w-[40%]'>
					<label className='text-gray-500'>Team Name</label>
					<Input
						placeholder='Enter team name'
						className='mt-3'
						onChange={(e) => setTeamName(e.target.value)}
					/>
				</div>
				<Button
					className='bg-blue-500 mt-9 w-[30%] hover:bg-blue-600'
					disabled={!(teamName && teamName?.length > 0)}
					onClick={() => createNewTeamAfterValidation()}
				>
					Create Team
				</Button>
			</div>
		</div>
	);
}

export default CreateTeam;
