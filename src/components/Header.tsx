import '../styles/Header.scss'
import {Link} from "react-router-dom";
import Logo from './Logo';

interface HeaderProps {
    theme: 'light' | 'dark'
}

export default function Header(props: HeaderProps) {
    const lightColor = "#ffffff"
    const darkColor = "#010101"

    const logoColor = props.theme === 'dark' ? lightColor : darkColor

    return (
        <div className={"header-bg" + (props.theme === "dark" ? " dark" : " light")}>
            <div className={"header" + (props.theme === "dark" ? " dark" : " light")}>
                <Link to="/">
                    <Logo logoColor={logoColor}/>
                </Link>
                <nav>
                    <ul>
                        <li><a href="/mobile_app">Mobile App</a></li>
                        <li><a href="/faq">FAQs</a></li>
                        <li><a href="/contacts">Contact</a></li>
                        <li className="signup"><a href="/signup">Sign up</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}