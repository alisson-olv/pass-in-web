import nlwUniteIcon from '../assets/nlw-icon.svg';

export function Header() {
  return (
    <header className='flex gap-5 items-center py-2'>
      <img src={nlwUniteIcon} alt="Logo NLW" />

      <nav className='flex gap-5'>
        <a href="" className='font-medium text-sm text-zinc-300'>Eventos</a>
        <a href="" className='font-medium text-sm'>Participantes</a>
      </nav>
    </header>
  )
}