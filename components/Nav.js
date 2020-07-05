import Link from 'next/link';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/about'>
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href='/event/slug'>
            <a>Event</a>
          </Link>
        </li>
        <li>
          <Link href='/habits'>
            <a>Habit</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
          nav {
            padding: 0 0.5rem;
            display: flex;
            justify-content: start;
            align-items: center;
          }
          ul {
            display: flex;
            width: 100%;
            justify-content: space-evenly;
          }
          li {
            list-style: none
          }
        `}</style>
    </nav>
  )
}

export default Nav;