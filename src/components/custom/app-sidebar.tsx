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
import { ChartLine, Key, WandSparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { NavUser } from './nav-user';

const items = [
  { title: 'Dashboard', url: 'dashboard', icon: ChartLine },
  { title: 'Vault', url: 'vault', icon: Key },
  { title: 'Generator', url: 'generator', icon: WandSparkles },
];

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
};
export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const currentPath = location.pathname;

  return (
    <Sidebar>
      <SidebarHeader className="my-2">
        <Link to={''}>
          <h1
            className="h-auto py-2 font-semibold text-2xl sm:text-[2rem] text-center text-wrap text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-orange-400"
            style={{ fontStretch: 'extra-expanded' }}
          >
            {state === 'collapsed' ? 'LB' : 'Lockbase'}
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  'mx-3 px-4 py-6 w-full dark:text-zinc-400 text-zinc-600 hover:dark:text-white hover:dark:bg-zinc-800 hover:bg-blue-200 transition-all',
                  state === 'collapsed'
                    ? 'mb-2 mx-1 flex justify-center items-center'
                    : 'mb-1 mx-3  border-l-2 hover:border-l-4 border-transparent hover:border-blue-500',
                  currentPath.includes(item.url)
                    ? 'dark:bg-zinc-800 bg-blue-200 font-semibold border-l-4 dark:border-blue-500 border-blue-500'
                    : '',
                  state === 'collapsed' && currentPath.includes(item.url)
                    ? 'border-l-3'
                    : '',
                )}
              >
                <Link to={item.url}>
                  <item.icon
                    className={cn(
                      state === 'collapsed'
                        ? 'scale-[1.4] hover:scale-[1.7]'
                        : 'scale-[1.3]',
                      'transition-all dark:text-white text-black',
                      currentPath.includes(item.url) ? 'mx-0.5' : '',
                    )}
                  />
                  {state != 'collapsed' ? (
                    <span className="font-medium">{item.title}</span>
                  ) : null}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mx-1">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
