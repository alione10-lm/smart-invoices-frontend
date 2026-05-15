import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/Layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Suppliers from "./pages/Suppliers";
import Invoices from "./pages/Invoices";
import SupplierDetail from "./pages/SupplierDetail";
import InvoiceDetails from "./pages/InvoiceDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<AppLayout />}>
                    <Route path="/" element={<Dashboard />} />

                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/suppliers/:id" element={<SupplierDetail />} />

                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/invoices/:id" element={<InvoiceDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
