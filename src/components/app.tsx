import { JSX } from 'react';
import MainScreen from './main-screen.tsx';

type AppScreenProps = {
  cardCount: number;
}

function App({cardCount}: AppScreenProps) : JSX.Element {
  return (
    <MainScreen cardCount={cardCount}/>
  );
}

export default App;
