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
import Detail from './Animals/Checklist/Detail';
import Reservation from './Places/Reservation/Reservation';
import BoardDetail from './Community/Review/BoardDetail';
import './App.css';
import About from './Pages/About';

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
            <Route path="/community/review/:id" element={<BoardDetail />} />
            <Route path="/places/:id" element={<Place />} />
            <Route path="/places/:id/:id" element={<Reservation />} />
            <Route path="/user" element={<User />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
          </Routes>

          <Footer />
        
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
