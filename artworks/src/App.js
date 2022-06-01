import Dashboard from './components/Dashboard';
import Preferences from './components/Preferences';
import Login from './components/Login';
import Start from './components/Start';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UseToken from './components/UseToken';

function App() {
  const { token, setToken, removeToken } = UseToken();

  if (!token) return <Login setToken={setToken} />;

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/gallery' element={<Dashboard />} />
          <Route path='/favourites' element={<Preferences />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
