import '../styles/index.scss'
import '../styles/HomePage.scss'
import InputForm from "../components/InputForm.tsx";
import Header from "../components/Header.tsx";

export default function HomePage() {
    return (
        <>
            <Header theme="dark"/>
            <div className="page HomePage">
                <div className="content">
                    <h1>Let's Find That Ticket</h1>
                    <h2>before someone else does</h2>
                    <InputForm theme={'dark'}/>
                </div>
            </div>
        </>

    )
}