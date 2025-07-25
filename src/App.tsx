import { Route, Routes } from 'react-router';
import HomeLayout from './Layouts/HomeLayout';
import Home from './components/Pages/Home';
import Mfa from './components/Pages/Mfa';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* ToDo */}
          <Route path="/:username/sign-up/SecQue" element={<SignUp />} />
          <Route path="/:username/sign-up/2fa" element={<Mfa />} />

          {/* Secured path */}
          <Route path="/:username/sign-in/2fa" element={<SignUp />} />
          <Route path="/:username/sign-in/SecQue" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
