import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/Layouts/AppLayout";
import ProtectRoute from "../routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Suppliers from "./pages/Suppliers";
import Invoices from "./pages/Invoices";
import SupplierDetail from "./pages/SupplierDetail";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<h1>login</h1>} />
                <Route path="/register" element={<h1>register</h1>} />
                {/* <Route path="/" element={
                        <ProtectedRoute>
                           <Dashboard />
                           </ProtectedRoute> }/> */}

                <Route element={<AppLayout />}>
                    <Route path="/" element={<Dashboard />} />

                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route
                        path="/suppliers/:id"
                        element={<SupplierDetail/>}
                    />

                    <Route path="/invoices" element={<Invoices />} />
                    <Route
                        path="/invoices/:id"
                        element={<h1>Invoice Details</h1>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
