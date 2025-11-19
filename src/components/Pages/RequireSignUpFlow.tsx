import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { toast } from 'sonner';

export default function RequireSignUpFlow({
  children,
}: {
  children: JSX.Element;
}) {
  const signUp = useSelector((state: RootState) => state.signUp);
  const location = useLocation();

  const basicInfoComplete =
    signUp.username &&
    signUp.email &&
    signUp.password &&
    signUp.countryCode &&
    signUp.cellNumber;

  const securityQuestionsComplete = signUp.securityQueAns.length === 2;

  const currentPath = location.pathname;

  if (currentPath.includes('/sign-up/SecQue') && !basicInfoComplete) {
    toast.warning('Redirecting to Sign Up', {
      description: 'Please complete your basic information to continue.',
    });
    return <Navigate to="/sign-up" replace />;
  }

  if (currentPath.includes('/sign-up/2fa') && !securityQuestionsComplete) {
    toast.warning('Redirecting to Security Questions', {
      description: 'Please answer your security questions before continuing.',
    });
    return <Navigate to="/sign-up/SecQue" replace />;
  }

  return children;
}
