import { Route, Routes } from 'react-router';
import HomeLayout from './Layouts/HomeLayout';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
