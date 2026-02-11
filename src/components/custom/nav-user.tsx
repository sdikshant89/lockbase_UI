import { BadgeCheck, ChevronsUpDown, LogOut, Sparkles } from 'lucide-react';

import { useLockbaseApi } from '@/api/ApiService';
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
import { logout } from '@/store/slices/authSlice';
import { clearVault } from '@/store/slices/vaultSlice';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router';

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
  const { logoutAPI } = useLockbaseApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const username = pathSegments[0];

  const onLogout = async () => {
    await logoutAPI.logoutUser();
    dispatch(logout());
    dispatch(clearVault());
    navigate('/sign-in');
  };

  const trigger = (
    <SidebarMenuButton
      size="xl"
      className={cn(
        'w-full hover:dark:bg-zinc-800 hover:bg-blue-100 :text-sidebar-accent-foreground rounded-xl transition-all',
        state === 'collapsed'
          ? ''
          : 'border-b-2 hover:border-b-4 hover:dark:border-b-3 border-transparent hover:border-blue-500',
      )}
    >
      <Avatar className="h-9 w-9 rounded-lg hover:scale-[1.05] transition-all">
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
          sideOffset={2}
          className="min-w-56 rounded-lg ml-28 md:ml-0"
        >
          <DropdownMenuLabel className="mt-1.5 p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="ml-1 h-11 w-11 rounded-lg">
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-lg">
                  {user.name}
                </span>
                <span className="truncate text-sm">{user.email}</span>
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
            <Link to={`/${username}/account-settings`}>
              <DropdownMenuItem>
                <BadgeCheck />
                <span>Account</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={onLogout}
            variant="destructive"
            className="m-1.5 text-white bg-red-400 hover:bg-red-500 dark:bg-red-600 hover:dark:bg-red-800"
          >
            <LogOut />
            Log out
          </DropdownMenuItem>
        </CustomDropdown>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
