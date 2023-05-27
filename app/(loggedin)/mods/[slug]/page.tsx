import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MoonkeyEditor from './MoonkeyEditor';
import { PlusCircle, Settings2 } from 'lucide-react';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Page() {
	return (
		<div className='flex items-center justify-center flex-col col-span-6 mt-10 mr-3'>
			<Tabs defaultValue='main' className='w-[800px]'>
				<TabsList className='grid w-full grid-cols-3'>
					<TabsTrigger value='main'>Main</TabsTrigger>
					<TabsTrigger value='settings'>Settings</TabsTrigger>
					<TabsTrigger value='advanced'>Advanced</TabsTrigger>
				</TabsList>
				<TabsContent value='main'>
					<div className='grid gap-4'>
						<div className='flex items-center space-x-4 rounded-md border p-4'>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant='outline' className='w-10 rounded-full p-0'>
										<Settings2 className='h-4 w-4' />
										<span className='sr-only'>Open</span>
									</Button>
								</PopoverTrigger>
								<PopoverContent className='w-80'>
									<div className='grid gap-4'>
										<div className='space-y-2'>
											<h4 className='font-medium leading-none'>
												Paymaster configure
											</h4>
											<p className='text-sm text-muted-foreground'>
												Set the sponsor paymaster API link
											</p>
										</div>
										<div className='grid gap-2'>
											<div className='grid grid-cols-3 items-center gap-4'>
												<Label htmlFor='paymasterAPI'>API</Label>
												<Input
													id='paymasterapi'
													defaultValue='moonkey/api'
													className='col-span-2 h-8'
												/>
											</div>
											<div className='grid grid-cols-3 items-center gap-4'>
												<Label htmlFor='paymasterKey'>API Key</Label>
												<Input
													id='paymasterkey'
													placeholder='API-key from sponsor'
													className='col-span-2 h-8'
												/>
											</div>
										</div>
									</div>
								</PopoverContent>
							</Popover>
							<div className='flex-1 space-y-1'>
								<p className='text-sm font-medium leading-none'>Paymaster</p>
								<p className='text-sm text-muted-foreground'>
									Configure gas sponsor
								</p>
							</div>
							<Switch checked />
						</div>
						<div className='flex items-center space-x-4 rounded-md border p-4'>
							<Settings2 />
							<div className='flex-1 space-y-1'>
								<p className='text-sm font-medium leading-none'>
									Transaction Guard
								</p>
								<p className='text-sm text-muted-foreground'>
									Increase account security with transaction guards
								</p>
							</div>
							<Switch disabled />
						</div>
						<div className='flex items-center space-x-4 rounded-md border p-4'>
							<Settings2 />
							<div className='flex-1 space-y-1'>
								<p className='text-sm font-medium leading-none'>
									Social Recovery
								</p>
								<p className='text-sm text-muted-foreground'>
									Add account recovery
								</p>
							</div>
							<Switch disabled />
						</div>
						<div className='flex items-center space-x-4 rounded-md border p-4'>
							<PlusCircle size={24} />
							<div className='flex-1 space-y-1'>
								<p className='text-sm font-medium leading-none'>Modules</p>
								<p className='text-sm text-muted-foreground'>
									Add your modules here
								</p>
							</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent value='advanced'>
					<div className='flex justify-center items-center space-x-4'>
						<MoonkeyEditor />
					</div>
				</TabsContent>
				<TabsContent value='settings'>Settings menus.</TabsContent>
			</Tabs>
		</div>
	);
}
