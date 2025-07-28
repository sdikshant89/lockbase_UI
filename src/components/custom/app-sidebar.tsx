import { FcComboChart, FcFlashOn, FcFolder } from 'react-icons/fc';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Link } from 'react-router';
import { NavUser } from './nav-user';

const items = [
  { title: 'Dashboard', url: 'dash', icon: FcComboChart },
  { title: 'Vault', url: 'vault', icon: FcFolder },
  { title: 'Generator', url: 'generator', icon: FcFlashOn },
];

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
};
export function AppSidebar() {
  const { state } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader className="mb-2">
        <h1
          className="h-auto py-2 font-semibold text-2xl sm:text-4xl text-center text-wrap text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-orange-400"
          style={{ fontStretch: 'extra-expanded' }}
        >
          {state === 'collapsed' ? 'LB' : 'Lockbase'}
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  'rounded-md mx-3 w-full text-zinc-400 hover:text-white hover:dark:bg-zinc-600 hover:bg-blue-400  hover:font-semibold hover:scale-102 transition-all',
                  state === 'collapsed'
                    ? 'mb-2 mx-1 flex justify-center items-center'
                    : 'mb-1 mx-3'
                )}
              >
                <Link to={item.url}>
                  <item.icon
                    className={cn(
                      state === 'collapsed'
                        ? 'scale-[1.7] hover:scale-[1.9]'
                        : 'scale-[1.2]',
                      'transition-all'
                    )}
                  />
                  {state != 'collapsed' ? (
                    <span className="text-lg">{item.title}</span>
                  ) : null}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mx-2">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
