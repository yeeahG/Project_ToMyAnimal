import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Menu from './Pages/Menu';
import Home from './Pages/Home'

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Menu />
          
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
