import SignTemplate from '@/components/SignTemplate';
import { Outlet } from 'react-router';

function HomeLayout() {
  return (
    <>
      <SignTemplate />
      <Outlet />
    </>
  );
}

export default HomeLayout;
