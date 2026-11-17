import { NavLink } from 'react-router-dom'
import { AppBar } from '@mui/material'

export default function NavBar() {
    return (
        <AppBar>
        <nav
          className='NavBar'
        >
            <ul className='menu'>
                <li>
                    <NavLink to='/'>HOME</NavLink>
                </li>
                <li>
                    <NavLink to='/trivia'>TRIVIA</NavLink>
                </li>
                <li>
                    <NavLink to='/login'>LOGIN</NavLink>
                </li>
            </ul>
        </nav>
        </AppBar>
    );
}