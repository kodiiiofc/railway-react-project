import './styles/App.scss'
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import ReviewBookingPage from "./pages/ReviewBookingPage.tsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/booking" element={<BookingPage />}/>
            <Route path="/booking/review" element={<ReviewBookingPage />}/>
        </Routes>
    </>
  )
}

export default App
