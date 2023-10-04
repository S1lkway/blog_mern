import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode";
// - Redux
import { logout, reset } from '../features/auth/authSlice'
import { resetArticles } from '../features/articles/articleSlice'
import { resetNews } from '../features/news/newsSlice'


function PrivateRoutes() {
  const dispatch = useDispatch()
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const prevUrl = location.pathname;

  if (user != null) {
    const token = user.token
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      dispatch(logout())
      dispatch(reset())
      dispatch(resetArticles())
      dispatch(resetNews())

      return <Navigate to="/login" state={{ 'prevUrl': prevUrl }} />
    }
    return <Outlet />
  } else {
    return <Navigate to="/login" state={{ 'prevUrl': prevUrl }} />
  }

}

export default PrivateRoutes