import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Router from './components/router/Router';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Router/>
      </BrowserRouter>
    </div>
  );
}

export default App;
