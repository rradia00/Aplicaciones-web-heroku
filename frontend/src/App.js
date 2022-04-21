import './App.css';

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Login from './pages/login.js';
import Notes from './pages/notes.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/:user/notes" element={<Notes/>}/>
        </Routes>
      </div>
    </Router>
  );
}          



export default App;
