//import RootTemplate from '@/Layouts/RootTemplate';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { Outlet } from 'react-router';

function HomeLayout() {
  return (
    <>
      <BackgroundGradientAnimation>
        {/* <RootTemplate /> */}
        <Outlet />
      </BackgroundGradientAnimation>
    </>
  );
}

export default HomeLayout;
