import Link from 'next/link';
import { MdHome, MdInfo, MdSettings, MdDescription } from 'react-icons/md';
import { BiLogOutCircle } from "react-icons/bi";

const Adminmenubar = (props) => {
    return (
        <nav className="profile-navbar">
           
            <ul className="menu-icons">

                <li className="menu-icons__item"  onClick={props.signOut}>
                    <div className="menu-icons__item--wrapper">
                        <BiLogOutCircle />
                        <div className="menu__texts desktop__off">خروج</div>
                    </div>
                </li>

                <li className="menu-icons__item" onClick={props.showProfile}>
                    <div className="menu-icons__item--wrapper">
                        <MdSettings />
                        <div className="menu__texts desktop__off">تنظیمات</div>
                    </div>
                </li>

                <li
                    className={`menu-icons__item ${
                        props.borderRouter === 'shop' ? 'border__router' : ''
                    }`}
                >
                    <Link href="/adminarchive">
                        <div className="menu-icons__item--wrapper">
                            <MdDescription />
                            <div className="menu__texts desktop__off">
                                کتابخانه
                            </div>
                        </div>
                    </Link>
                </li>

                <li
                    className={`menu-icons__item ${
                        props.borderRouter === 'panel' ? 'border__router' : ''
                    }`}
                >
                    <Link href="/adminpanel">
                        <div className="menu-icons__item--wrapper">
                            <MdHome />
                            <div className="menu__texts desktop__off">خانه</div>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Adminmenubar;
