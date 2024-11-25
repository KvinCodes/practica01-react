import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import Navbar from './components/views/partials/Navbar';
import Footer from './components/views/partials/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Router />
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
