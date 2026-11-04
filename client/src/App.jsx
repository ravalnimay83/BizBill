import Menubar from "./components/menubar/Menubar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import {Toaster} from "react-hot-toast";
import Login from "./pages/Login/Login.jsx";

const App = () => {

    const location = useLocation();

    return (
        <div>
            {location.pathname !== "/login" && <Menubar/>}
            <Toaster/>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/category" element={<ManageCategory/>} />
                <Route path="/users" element={<ManageUsers/>} />
                <Route path="/items" element={<ManageItems/>} />
                <Route path="/explore" element={<Explore/>} />
                <Route path="/login" element={<Login/>}/>

            </Routes>
        </div>

    );
}
export default App;
