import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Menu from './Pages/Menu';
import Home from './Pages/Home'
import './App.css';
import User from './Users/User';
import Animal from './Animals/Animal';
import Place from './Places/Place';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Menu />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/animal" element={<Animal />} />
            <Route path="/user" element={<User />} />
            <Route path="/places" element={<Place />} />
          </Routes>
        
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
