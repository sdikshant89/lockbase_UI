import RootTemplate from '@/Layouts/RootTemplate';
import { Outlet } from 'react-router';

function HomeLayout() {
  return (
    <>
      <RootTemplate />
      <Outlet />
    </>
  );
}

export default HomeLayout;
