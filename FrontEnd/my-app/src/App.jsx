import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import NotificationSettings from './components/NotificationSettings';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Squad from './components/Squad';
import { AuthProvider } from './components/AuthProvider';
import Matchday from './components/Matchday';
import Profile from './components/Profile';
import './components/style/App.css'

function App() {
  return (
     <AuthProvider>
     <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <div className='dashborad-container'>
            <Dashboard />
            <Profile/>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/notificationSettings" element={
          <ProtectedRoute>
            <NotificationSettings />
          </ProtectedRoute>
        } />
        <Route path="/squad" element={
          <ProtectedRoute>
            <Squad/>
          </ProtectedRoute>
        } />
         <Route path="/matchday" element={
          <ProtectedRoute>
            <Matchday/>
          </ProtectedRoute>
        } />
      </Routes>
     </AuthProvider>
  )

}



export default App
