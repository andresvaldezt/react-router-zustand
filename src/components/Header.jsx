import { Link } from "./Link"
import { NavLink } from "react-router"
import { useAuth } from "../context/AuthContext"

export function Header(){

    return(
        <header>
            <Link href="/" style={{textDecoration: 'none'}}>
                <h1 style={{color: 'white'}}>
                    <svg 
                    fill="none" 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2"
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    DevJobs
                </h1>
            </Link>
            <nav>
                <Link href="/" rel="noopener noreferer">Inicio</Link>
                <NavLink 
                    className={({ isActive }) => isActive ? 'nav-link-active' : ''}
                    to="search"
                >
                        Empleos
                </NavLink>
            </nav>
            <HeaderUserButton></HeaderUserButton>
            <div>
                <devjobs-avatar
                service="google"
                username="google.com"
                size="40" >
                </devjobs-avatar>
                <devjobs-avatar
                service="google"
                username="github.com"
                size="40" >
                </devjobs-avatar>
                <devjobs-avatar
                service="x"
                username="Antrick_Twitch"
                size="40" >
                </devjobs-avatar>
                <devjobs-avatar
                service="github"
                username="andresvaldezt"
                size="50" >
                </devjobs-avatar>
            </div>
        </header>
    )
}

const HeaderUserButton = () => {
    const { isLoggedIn, login, logout } = useAuth()

    return isLoggedIn
        ? <button className={`job-apply-button`} onClick={logout}>Cerrar sesión</button>
        : <button className={`job-apply-button`} onClick={login}>Iniciar sesión</button>
}