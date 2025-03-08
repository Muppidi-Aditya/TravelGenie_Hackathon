import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LandingPage from "./Pages/LandingPage";
import LoginRegisterPage from "./Pages/LoginRegisterPage";
import HomePage from "./Pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import GoogleMaps from "./Pages/Test";
import TravelTribes from "./Pages/TravelTribes";

const App = () => (
    <Router>
        <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginRegisterPage />} />
            <Route path="/test" element = {<GoogleMaps />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/traveltribes"
                element={
                    <ProtectedRoute>
                        <TravelTribes />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </Router>
);

export default App;