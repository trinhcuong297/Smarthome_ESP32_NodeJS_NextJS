'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useUserDataContext } from '@/context/UserDataContext';
import { fetchUserAttributes, getCurrentUser, signOut } from 'aws-amplify/auth';
import { CircleUserRoundIcon, LoaderCircle, LogOutIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const fetchAttribute = async (setUserAttributes: any) => {
  const user = await fetchUserAttributes();
  await setUserAttributes(user);
};

const fetchSession = async (setUserSession: any) => {
  const user = await getCurrentUser();
  await setUserSession(user);
};

export function UserNav() {
  const {userAttributes, setUserAttributes, userSession, setUserSession} = useUserDataContext();

  useEffect(() => {
    fetchAttribute(setUserAttributes);
    fetchSession(setUserSession);
  },[setUserAttributes, setUserSession])

  if (userAttributes) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex'>
            <div className="flex flex-col space-y-1 pr-4">
              <p className="text-sm font-medium leading-none">
                {userAttributes?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userAttributes?.email}
              </p>
            </div>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <CircleUserRoundIcon className='w-full h-full' />
            </Avatar>
          </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {userAttributes?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userAttributes?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={async () => { await signOut()}}>
            Log out
            <DropdownMenuShortcut><LogOutIcon /></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex'>
            <div className="flex flex-col space-y-1 pr-4 items-center justify-center">
              <LoaderCircle className='h-5 w-5 animate-spin'/>
            </div>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <CircleUserRoundIcon className='w-full h-full' />
            </Avatar>
          </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={async () => { await signOut()}}>
            Log out
            <DropdownMenuShortcut><LogOutIcon /></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}
