import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { Outlet } from 'react-router';

function HomeLayout() {
  return (
    <>
      <BackgroundGradientAnimation>
        <Outlet />
      </BackgroundGradientAnimation>
    </>
  );
}

export default HomeLayout;
