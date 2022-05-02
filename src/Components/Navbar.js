import { React } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import "../styles/Navbar.scss";

import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from '../Redux/actions/user';
import { Button } from '@mui/material';



export default function NavBar({ }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth); 
    const optionsNoAuth = [
        {
            name: 'Inicio de sesion',
            path: '/login',
        },
        {
            name: 'Registrarse',
            path: '/register',
        }
    ]
    const optionsIsAuth = [
        {
            name: 'Ver lista',
            path: '/list',
        },
        {
            name: 'Cerrar sesion',
            cb: () => {
                dispatch(logoutAsync())
                navigate('/')
            }  
        },
    ]
    const menuShow = isAuth ? optionsIsAuth : optionsNoAuth;    
    const midMenu = Math.floor(menuShow.length / 2);
    return (
        <div className="header">
            {[...menuShow].slice(0, midMenu).map((item, index) => (
                <Button component={item.path ? Link : "a" } key={index} to={item.path}>
                    <p>{item.name}</p>
                </Button>
            ))}
            <Link to="/">
                <h2 className='headerLogo'><b>Climatico</b></h2>
            </Link>
            {[...menuShow].slice(midMenu, menuShow.length).map((item, index) => (
                <Button component={item.path ? Link : "a" } key={index} to={item.path} onClick={item.cb}>
                    <p>{item.name}</p>
                </Button>
            ))}
        </div>

    )

}