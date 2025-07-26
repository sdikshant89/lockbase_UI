import { Route, Routes } from 'react-router';
import Home from './components/Pages/Home';
import Mfa from './components/Pages/Mfa';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import HomeLayout from './Layouts/HomeLayout';
import RequireAuth from './Layouts/RequireAuth';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* Add Sign Up flow route */}
          <Route path="/:username/sign-up/SecQue" element={<SignUp />} />
          <Route path="/:username/sign-up/2fa" element={<Mfa />} />

          {/* Add Sign Ip flow route */}
          <Route path="/:username/sign-in/2fa" element={<SignUp />} />
          <Route path="/:username/sign-in/SecQue" element={<SignUp />} />
        </Route>

        <Route element={<RequireAuth />}>
          {/* <Route element={<DashLayout />}> */}
          <Route path="/:username/dashboard" element={<SignUp />} />
          {/* </Route> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
