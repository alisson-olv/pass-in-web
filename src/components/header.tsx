import nlwUniteIcon from '../assets/nlw-icon.svg';
import { NavLink } from './nav-link';

export function Header() {
  return (
    <header className='flex gap-5 items-center py-2'>
      <img src={nlwUniteIcon} alt="Logo NLW" />

      <nav className='flex gap-5'>
        <NavLink href='/eventos'>Eventos</NavLink>
        <NavLink href='/participantes'>Participantes</NavLink>
      </nav>
    </header>
  )
}