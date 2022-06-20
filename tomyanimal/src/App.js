import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Menu from './Pages/Menu';
import Home from './Pages/Home'
import User from './Users/User';
import Signup from './Users/Signup';
import Animal from './Animals/Animal';
import Place from './Places/Place';
import Footer from './Pages/Footer';
import './App.css';
import Community from './Community/Community';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Menu />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/animal" element={<Animal />} />
            <Route path="/community" element={<Community />} />
            <Route path="/places/:id" element={<Place />} />
            <Route path="/user" element={<User />} />
            <Route path="/register" element={<Signup />} />
          </Routes>

          <Footer />
        
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
