import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './components/custom/theme-provider';
import ForgotPassword from './components/Pages/ForgotPassword';
import Home from './components/Pages/Home';
import Mfa from './components/Pages/Mfa';
import RequireSignUpFlow from './components/Pages/RequireSignUpFlow';
import SecQue from './components/Pages/SecQue';
import SignIn from './components/Pages/SignIn';
import SignUp from './components/Pages/SignUp';
import SignUpSuccess from './components/Pages/SignUpSuccess';
import WelcomePage from './components/Pages/Welcome';
import DashLayout from './Layouts/DashLayout';
import HomeLayout from './Layouts/HomeLayout';
import { persistor, store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-pass" element={<ForgotPassword />} />
              <Route
                path="/signup-success"
                element={
                  <RequireSignUpFlow>
                    <SignUpSuccess />
                  </RequireSignUpFlow>
                }
              />
              <Route
                path="/sign-up/SecQue"
                element={
                  <RequireSignUpFlow>
                    <SecQue />
                  </RequireSignUpFlow>
                }
              />
              <Route
                path="/sign-up/2fa"
                element={
                  <RequireSignUpFlow>
                    <Mfa />
                  </RequireSignUpFlow>
                }
              />
            </Route>

            {/* <Route element={<RequireAuth />}> */}
            <Route path="/:username" element={<DashLayout />}>
              <Route index element={<WelcomePage />} />
              <Route path="dashboard" />
              <Route path="generator" />
              <Route path="vault" />
            </Route>
            {/* </Route> */}
          </Routes>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
