import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Menu from './Pages/Menu';
import Home from './Pages/Home'
import './App.css';
import User from './Users/User';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Menu />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
          </Routes>
        
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
