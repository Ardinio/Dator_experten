import { Route, Routes } from "react-router-dom";
import ComputerPartProductPage from "../pages/ComputerPartProductPage";
import ComputerPartsPage from "../pages/ComputerPartsPage";
import HomePage from "../pages/HomePage";
import LaptopProductPage from "../pages/LaptopProductPage";
import LaptopsPage from "../pages/LaptopsPage";
import LoginPage from "../pages/LoginPage";
import UserEditPage from "../pages/UserEditPage";
import UserLaptopsProductsPage from "../pages/UserLaptopsProductsPage";
import UserComputerPartsProductsPage from "../pages/UsersComputerPartsProductsPage";
import { CssBaseline } from "@mui/material";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <div>
            <CssBaseline/>

            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/computerparts" element={<ComputerPartsPage />} />
                <Route path="/computerpartproduct/:id" element={<ComputerPartProductPage />} />
                <Route path="/computerpartproduct" element={<ComputerPartProductPage />} />
                <Route path="/laptops" element={<LaptopsPage />} />
                <Route path="/laptopproduct/:id" element={<LaptopProductPage />} />
                <Route path="/laptopproduct" element={<LaptopProductPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/useredit" element={<UserEditPage />} />
                <Route path="/userlaptopsproduct" element={<UserLaptopsProductsPage />} />
                <Route path="/usercomputerpartsproduct" element={<UserComputerPartsProductsPage />} />
            </Routes>
        </div>
    )
}

export default Layout;