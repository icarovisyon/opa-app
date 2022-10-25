import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import { Homepage } from './pages/home'
import { Departamento } from "./pages/department";
import { Client } from "./pages/client";
import { Attendance } from "./pages/attendance";

function AppRoutes() {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/departamento" element={<Departamento />} />
                <Route path="/cliente" element={<Client />} />
                <Route path="/atendente" element={<Attendance />} />
            </Routes>
        </Router>

    );
}

export default AppRoutes;