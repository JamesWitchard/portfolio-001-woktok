import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home.js"
import AddRecipe from "./pages/AddRecipe";
import './App.css';

function App() {
  return (
      <div className="App">
        <Router>
          <Link to="/">Home Page</Link>
          <Link to="/add-recipe">Add a Recipe</Link>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/add-recipe" exact element={<AddRecipe/>} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
