import Link from 'next/link';
import classes from './main-navigation.module.css';
import { AiFillHome } from "react-icons/ai";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href='/'>
        <div className="pointer">
          <AiFillHome size='2rem' />
        </div>
      </Link>
      <nav>
        <ul className="menu__blog-gridder">
          {/* <li >
            <Link href='/blog'> پست‌ها</Link>
          </li> */}
          {/* <li >
            <Link href='/flashcardslist'>فلش‌کارت‌ها </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
