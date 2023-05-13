import {useState, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import {Home, AddRecipe, Recipe, Profile, Login, Register} from "./pages";
import Navbar from "./components/Navbar";
import style from './styles/App.module.css';
import {AuthContext} from "./helpers/AuthContext";
import axios from "axios";
import Sidebar from "./components/Sidebar";


function App() {
    const [authState, setAuthState] = useState({
        username: "",
        id: 0,
        status: false
    });

    const [sidebarVisible, setSidebarVisible] = useState(true)

    const contextValues = {
        authState, setAuthState,
        sidebarVisible, setSidebarVisible
    };

    useEffect(() => {
        axios.get('http://localhost:3001/auth',{
            headers: {
                accessToken: localStorage.getItem('accessToken'),
            }
        }).then(res => {
            if (res.data.error) {
                setAuthState({...authState, status: false});
                return;
            }
            setAuthState({
                username: res.data.username,
                id: res.data.id,
                status: true
            });
        })
    }, [])

    return (
        <div className={style.App}>
            <AuthContext.Provider value={contextValues}>
                <Router>
                    <Navbar/>
                    <Sidebar/>
                    <Routes>
                        <Route path="/" exact element={<Home/>}/>
                        <Route path="/login" exact element={<Login/>}/>
                        <Route path="/registration" exact element={<Register/>}/>
                        <Route path="/add-recipe" exact element={<AddRecipe/>}/>
                        <Route path="/recipe/:id" exact element={<Recipe/>}/>
                        <Route path="/profile/:id" exact element={<Profile />}/>
                        <Route path="*" element={<h1 style={{marginTop: "4rem"}}>404</h1>}/>
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
