import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from "./pages/Home.js"
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";
import NavbarComponent from "./components/NavbarComponent";
import Register from "./pages/Register";
import Login from "./pages/Login";
import style from './styles/App.module.css';
import {AuthContext} from "./helpers/AuthContext";
import axios from "axios";


function App() {
    const [authState, setAuthState] = useState(false);
    const contextValues = {authState, setAuthState}

    useEffect(() => {
        axios.get('http://localhost:3001/auth',{
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(res => {
            if (res.data.error) {
                setAuthState(false);
                return;
            }
            setAuthState(true);
        })
    }, [])

    return (
        <div className={style.App}>
            <AuthContext.Provider value={contextValues}>
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
            </AuthContext.Provider>
        </div>
    );
}

export default App;
