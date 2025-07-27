import { ArrowRight, User2 } from 'lucide-react';
import { FcComboChart, FcEngineering, FcFolder } from 'react-icons/fc';

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
import { Button } from '../ui/button';

const items = [
  { title: 'Dashboard', url: 'dash', icon: FcComboChart },
  { title: 'Vault', url: 'vault', icon: FcFolder },
  { title: 'Generator', url: 'generator', icon: FcEngineering },
];

export function AppSidebar() {
  const { state } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader>
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
                  'rounded-md mx-3 w-full hover:bg-zinc-200 hover:dark:bg-zinc-600 text-zinc-400 hover:font-semibold hover:scale-102 transition-all',
                  state === 'collapsed'
                    ? 'mb-2 mx-1 flex justify-center items-center'
                    : 'mb-1 mx-3'
                )}
              >
                <Link to={item.url}>
                  <item.icon
                    className={cn(
                      state === 'collapsed' ? 'scale-[1.7]' : 'scale-100',
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
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="w-full font-light text-lg bg-yellow-200 text-black dark:bg-amber-300 hover:font-semibold hover:scale-[1.05] transition-all">
              {state === 'collapsed' ? (
                <User2 className="scale-125" />
              ) : (
                <div className="flex justify-between items-center w-full">
                  <div className="flex justify-start gap-1 items-center">
                    <User2 /> Username
                  </div>
                  <div>
                    <ArrowRight />
                  </div>
                </div>
              )}
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
