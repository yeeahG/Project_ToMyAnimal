import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Menu from './Pages/Menu';
import Home from './Pages/Home'
import User from './Users/User';
import Signup from './Users/Signup';
import Animal from './Animals/Animal';
import Place from './Places/Place';
import Footer from './Pages/Footer';
import Community from './Community/Community';
import Article from './Community/components/Article';
import Admin from './Admin/Admin';
import CheckList from './Animals/Checklist/CheckList';
import Detail from './Animals/Checklist/Detail';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
          <Menu />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/animal" element={<Animal />} />
            <Route path="/animal/log/:id" element={<Detail />} />
            <Route path="/community/:id" element={<Community />} />
            <Route path="/community/board/:id" element={<Article />} />
            <Route path="/places/:id" element={<Place />} />
            <Route path="/user" element={<User />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>

          <Footer />
        
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
