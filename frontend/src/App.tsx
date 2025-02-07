import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/login';
import './global.css';
import './colors.css'
import { AuthProvider } from './contexts/auth/AuthContext';
import LoginComponent from './pages/auth/login';
import RegisterComponent from './pages/auth/register';
import RequireAuthAdmin from './contexts/auth/RequireAuthAdmin';
import { Index } from './pages/index';
import { CreateFormTasks } from './pages/Activities/FormTasks/createFormTasks';
import { UpdateFormTasks } from './pages/Activities/FormTasks/updateFormTasks';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path='/' element={<RequireAuthAdmin><Index/></RequireAuthAdmin>} />
            <Route path='/create' element={<RequireAuthAdmin><CreateFormTasks/></RequireAuthAdmin>} />
            <Route path='/update/:id' element={<RequireAuthAdmin><UpdateFormTasks/></RequireAuthAdmin>} />
            <Route path="*" element={<div>Pagina inexistente</div>} />
            
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;