import { SignedIn, SignedOut } from '@clerk/clerk-react';
import './App.css';
import AuthScreen from './components/AuthScreen';
import PlatedApp from './components/PlatedApp';

export default function App() {
  return (
    <>
      <SignedOut>
        <AuthScreen />
      </SignedOut>
      <SignedIn>
        <PlatedApp />
      </SignedIn>
    </>
  );
}
