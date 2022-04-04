import './App.css';
// In react-router-dom v6, "Switch" is replaced by routes "Routes".
// You also need to update the Route declaration..
// from component={Home} to element={<Home/>}
// In react-router-dom, you also not need to use exact in Route declaration.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users/:userId" element={<User />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
