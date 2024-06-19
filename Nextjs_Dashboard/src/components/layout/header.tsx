import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:flex items-center">
          <Link
            href={'/'}
            target="_blank"
          >
            <Image src="/logo.svg" width={0} height={0} sizes="100vw" style={{ width: 'auto' }} className='h-14 dark:bg-white' alt=''/>
          </Link>
          <h2 className="text-md font-semibold tracking-tight pl-3">Legend Smart Home</h2>
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
