import { BadgeCheck, ChevronsUpDown, LogOut, Sparkles } from 'lucide-react';

import {
  CustomDropdown,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/custom/custom-dropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { state, isMobile } = useSidebar();

  const trigger = (
    <SidebarMenuButton
      size="xl"
      className={cn(
        'w-full hover:dark:bg-zinc-800 hover:bg-blue-100 :text-sidebar-accent-foreground rounded-xl transition-all',
        state === 'collapsed'
          ? ''
          : 'border-b-2 hover:border-b-4 hover:dark:border-b-3 border-transparent hover:border-blue-500'
      )}
    >
      <Avatar className="h-9 w-9 rounded-lg hover:scale-[1.25] transition-all">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      {state === 'collapsed' ? null : (
        <>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </>
      )}
    </SidebarMenuButton>
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <CustomDropdown
          trigger={trigger}
          side={isMobile ? 'bottom' : 'right'}
          align="end"
          sideOffset={4}
          className="min-w-56 rounded-lg"
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => console.log('Upgrade clicked')}>
              <Sparkles />
              About
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => console.log('Account clicked')}>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => console.log('Logout clicked')}
            variant="destructive"
          >
            <LogOut />
            Log out
          </DropdownMenuItem>
        </CustomDropdown>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
