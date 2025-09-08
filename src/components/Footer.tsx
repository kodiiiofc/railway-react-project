import '../styles/Footer.scss'
import Logo from "./Logo.tsx";

export default function Footer() {
    return (
        <div className={"footer-bg"}>
            <div className={"footer"}>
                <div className={"footer-container"}>
                    <Logo logoColor={'white'}/>
                    <div className={"links"}>
                        <div>
                            <h1>About</h1>
                            <p>How it works</p>
                            <p>Featured</p>
                            <p>Partnership</p>
                            <p>Bussines Relation</p>
                        </div>
                        <div>
                            <h1>Community</h1>
                            <p>Events</p>
                            <p>Blog</p>
                            <p>Podcast</p>
                            <p>Invite a friend</p>
                        </div>
                        <div>
                            <h1>Socials</h1>
                            <p>Discord</p>
                            <p>Instagram</p>
                            <p>Twitter</p>
                            <p>Facebook</p>
                        </div>
                    </div>
                </div>
                <div className={"copyRights"}>©2025 RailWay. All rights reserved</div>
            </div>
        </div>
    )
}

