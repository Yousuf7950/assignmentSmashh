import './App.css';
import Entry from './components/Entry';
import Exit from './components/Exit1';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar , Nav, Container } from 'react-bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
<Container>
<Navbar.Brand href="/" style={{marginLeft:"-50px",marginRight:"50px"}}>Toll Station</Navbar.Brand>
<Nav className="me-auto">
  <Nav.Link href="/">Entry</Nav.Link>
  <Nav.Link href="/exit">Exit</Nav.Link>
</Nav>
</Container>
</Navbar>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Entry/>}/>;
      <Route path='/exit' element={<Exit/>}/>;
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
