import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoutes from './utils/PrivateRoutes'
//-Users
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
//-Articles
import Articles from './pages/Articles/Articles';
import CreateArticle from './pages/Articles/CreateArticle';
import EditArticle from './pages/Articles/EditArticle';

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

            <Route element={<PrivateRoutes />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/articles' element={<Articles />} />
              <Route path='/articles/create' element={<CreateArticle />} />
              <Route path='/articles/:id' element={<EditArticle />} />
            </Route>
          </Routes>

        </div>
      </Router>
      <ToastContainer autoClose={1500} />
    </>
  );
}

export default App;
