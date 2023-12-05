import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { useContext } from 'react';
import { tokenAuthorContext } from './Context/AuthToken';

function App() {
  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthorContext)
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth login/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/dashboard' element={ isAuthorised? <Dashboard/> :<Home/> }/>
        <Route path='/projects' element={ isAuthorised? <Projects/> : <Home/> }/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
