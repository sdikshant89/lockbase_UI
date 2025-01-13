import { Route, Routes } from 'react-router';
import HomeLayout from './Layouts/HomeLayout';
import Home from './components/Pages/Home';
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
