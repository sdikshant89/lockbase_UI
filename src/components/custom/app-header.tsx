import { useLockbaseApi } from '@/api/ApiService';
import { cn } from '@/lib/utils';
import { logout } from '@/store/slices/authSlice';
import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { generateThemeSwitch } from './theme-changer';
import { useTheme } from './theme-provider';

function AppHeader() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const { logoutAPI } = useLockbaseApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = pathSegments[0];
  const restSegments = pathSegments.slice(1);

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  function toTitleCase(value: string) {
    return value
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  const onLogout = async () => {
    await logoutAPI.logoutUser();
    dispatch(logout());
    navigate('/sign-in');
  };

  return (
    <div className="flex items-center justify-between bg-blue-400 dark:bg-zinc-950 ps-6 pe-2 text-white">
      <div className="py-5 flex justify-start items-center gap-3  dark:text-zinc-200">
        <div className="hover:dark:bg-zinc-800 hover:bg-blue-500 rounded-md p-1.5 transition-all">
          <SidebarTrigger className="scale-[130%] hover:scale-[140%] transition-all hover:bg-transparent shadow-none text-black dark:text-white" />
        </div>
        <Separator orientation="vertical" className="font-extrabold" />
        <Breadcrumb className="font-medium">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to={`/${username}`}
                  className={cn(
                    restSegments.length === 0
                      ? 'dark:text-white text-black'
                      : '',
                  )}
                >
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {restSegments.map((segment, index) => {
              const isLast = index === restSegments.length - 1;
              const href = `/${username}/${restSegments
                .slice(0, index + 1)
                .join('/')}`;

              return (
                <span
                  key={segment}
                  className="flex items-center justify-between"
                >
                  <BreadcrumbSeparator className="mr-2 text-black dark:text-muted-foreground" />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{toTitleCase(segment)}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={href}>{toTitleCase(segment)}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          onClick={onLogout}
          className="text-white bg-red-400 hover:bg-red-500 dark:bg-red-600 hover:dark:bg-red-800 hover:scale-105 transition-all"
        >
          <LogOut />
          Logout
        </Button>
        <Button
          className="p-5 transition-all scale-[150%] hover:scale-[140%] font-bold shadow-none"
          onClick={handleClick}
        >
          {generateThemeSwitch(theme)}
        </Button>
      </div>
    </div>
  );
}

export default AppHeader;
