import { Link } from "./Link"
import { NavLink } from "react-router"
import { useAuthStore } from "../store/authStore"
import { useFavoritesStore } from "../store/favoritesStore"
import { useApplyStore } from "../store/appliedStore"

export function Header(){

    const { isLoggedIn } = useAuthStore()
    const { countFavorites } = useFavoritesStore()
    const { countApplied } = useApplyStore()

    const numberOfFavorites = countFavorites()
    const numberOfApplied = countApplied()

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
                {
                    isLoggedIn && (
                        <NavLink
                            className={({isActive}) => isActive ? 'nav-link-active' : ''}
                            style={{display: 'flex', alignItems: 'center', gap: '5px'}}
                            to="/profile"
                        >
                            Profile | 
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="currentColor" 
                                className="icon icon-tabler icons-tabler-filled icon-tabler-heart"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
                            </svg>{numberOfFavorites} | 
                            <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="icon icon-tabler icons-tabler-filled icon-tabler-square-check">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M18.333 2c1.96 0 3.56 1.537 3.662 3.472l.005 .195v12.666c0 1.96 -1.537 3.56 -3.472 3.662l-.195 .005h-12.666a3.667 3.667 0 0 1 -3.662 -3.472l-.005 -.195v-12.666c0 -1.96 1.537 -3.56 3.472 -3.662l.195 -.005h12.666zm-2.626 7.293a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                                </svg>{numberOfApplied}
                        </NavLink>
                    )
                }
            </nav>
            <HeaderUserButton></HeaderUserButton>
        </header>
    )
}

const HeaderUserButton = () => {
    const { isLoggedIn, login, logout } = useAuthStore()

    return isLoggedIn
        ? <button className={`job-apply-button`} onClick={logout}>Cerrar sesión</button>
        : <button className={`job-apply-button`} onClick={login}>Iniciar sesión</button>
}