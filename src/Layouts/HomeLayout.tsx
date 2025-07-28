import AuthorCard from '@/components/custom/author-card';
import { ThemeChanger } from '@/components/custom/theme-changer';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { Outlet } from 'react-router';

function HomeLayout() {
  return (
    <>
      <BackgroundGradientAnimation>
        <ThemeChanger />
        <Outlet />
        <AuthorCard />
      </BackgroundGradientAnimation>
    </>
  );
}

export default HomeLayout;
