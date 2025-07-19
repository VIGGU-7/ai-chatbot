import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Signup, Homepage,Chatpage } from './pages';
import { useAuthStore } from './lib/store';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
function App() {
  const { isLoggedIn,checkAuth,isLoading } = useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[isLoggedIn])
  if(isLoading){
    return(
      <div className='w-full h-screen flex justify-center items-center'>
        <Loader className='animate-spin'/>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Homepage /> : <Navigate to="/login" />} />
      <Route path="/chat/:sessionId" element={isLoggedIn ? <Chatpage/> : <Navigate to="/login" />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
    </Routes>
  );
}

export default App;
