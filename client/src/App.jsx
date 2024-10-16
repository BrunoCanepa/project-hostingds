import { createContext } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import ProcessContext from "./context/process.context";
import MainScreen from "./pages/MainScreen";
import ErrorScreen from './pages/ErrorScreen';


export const UserContext = createContext()

function App() {
  return (
    //<ProcessContext>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path='*' element={<ErrorScreen />} />
      </Routes>
    </BrowserRouter>
    //</ProcessContext>
  );
}

export default App;
