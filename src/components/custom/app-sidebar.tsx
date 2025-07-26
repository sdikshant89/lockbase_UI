import { ArrowRight, Home, Inbox, User2 } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router';
import { Button } from '../ui/button';

const items = [
  { title: 'Dashboard', url: 'dash', icon: Inbox },
  { title: 'Generator', url: 'generator', icon: Home },
  { title: 'Vault', url: 'vault', icon: Inbox },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1
          className="h-auto py-2 font-semibold text-2xl sm:text-4xl text-center text-wrap text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-orange-400"
          style={{ fontStretch: 'extra-expanded' }}
        >
          Ld
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="rounded-md mx-3 w-auto mb-1 hover:bg-zinc-200 text-zinc-400 hover:font-semibold hover:scale-105 transition-all"
              >
                <Link to={item.url}>
                  <item.icon />
                  <span className="text-lg">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mx-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <Button className="w-full font-light text-lg bg-yellow-200 text-black hover:bg-yellow-200 hover:font-semibold hover:scale-[1.05] transition-all">
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-start gap-1 items-center">
                  <User2 /> Username
                </div>
                <div>
                  <ArrowRight />
                </div>
              </div>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
