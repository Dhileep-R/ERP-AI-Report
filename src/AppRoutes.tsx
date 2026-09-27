import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import SalesOrder from "./pages/Sales/SalesOrder";
import WelcomeScreen from "./pages/WelcomeScreen";
import SalesOrderAction from "./pages/Sales/SalesOrderAction";
import AIReport from "./pages/AIReport/AIReport";
import Customers from "./pages/Masters/Customers";
import CustomersAction from "./pages/Masters/CustomersAction";
import Parts from "./pages/Masters/Parts";
import PartsAction from "./pages/Masters/PartsAction";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/erp" element={<MainLayout />}>
                    <Route index element={<WelcomeScreen />} />
                    <Route path="sales-order" element={<SalesOrder />} />
                    <Route path="salesOrderAction" element={<SalesOrderAction />} />
                    <Route path="ai-report" element={<AIReport />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="customersAction" element={<CustomersAction />} />
                    <Route path="parts" element={<Parts />} />
                    <Route path="partsAction" element={<PartsAction />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}