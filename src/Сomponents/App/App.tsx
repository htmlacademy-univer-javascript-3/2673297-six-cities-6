import { JSX } from 'react';
import MainScreen from '../Pages/MainScreen.tsx';


type AppScreenProps = {
  offerCardCount: number;
}

function App({offerCardCount}: AppScreenProps) : JSX.Element {
  return (
    <MainScreen offerCardCount={offerCardCount}/>
  );
}

export default App;
