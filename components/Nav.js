import Link from 'next/link';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/retro">
            <a>Retro</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
        nav {
          padding: 0 0.6rem;
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
          list-style: none;
        }
      `}</style>
    </nav>
  );
};

export default Nav;
