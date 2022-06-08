import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Menu from './Pages/Menu';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Menu />
        
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
