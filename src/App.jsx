import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home";
import AppHeader from "./Components/AppHeader";
import AppFooter from "./Components/AppFooter";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {status} from "./redux/features/auth/authSlice";
import ProfileTab from "./Pages/profile/ProfileTab";

function App() {
    const {user} = useSelector((state) => state.auth)
    axios.defaults.withCredentials = true;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(status())
    }, []);
    return (
        <BrowserRouter>
            <AppHeader/>
            <Routes>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/profile'} element={<ProfileTab/>}/>
            </Routes>
            <AppFooter/>
        </BrowserRouter>
    );
}

export default App;
