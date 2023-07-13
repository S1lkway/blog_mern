import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Articles from './pages/Articles';
import CreateArticle from './pages/CreateArticle';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/articles' element={<Articles />} />
            <Route path='/articles/create' element={<CreateArticle />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
