import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home.js"
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";
import NavbarComponent from "./components/NavbarComponent";
import Register from "./pages/Register";
import Login from "./pages/Login";
import style from './styles/App.module.css';

function App() {
    return (
        <div className={style.App}>
            <Router>
                <NavbarComponent/>
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/login" exact element={<Login/>}/>
                    <Route path="/registration" exact element={<Register/>}/>
                    <Route path="/add-recipe" exact element={<AddRecipe/>}/>
                    <Route path="/recipe/:id" exact element={<Recipe/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
