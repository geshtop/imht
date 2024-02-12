import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import SiteLayout from "./components/layout/site/SiteLayout";
import DashLayout from "./components/layout/dash/DashLayout";
import CompaniesList from "./features/companies/list/CompaniesList";
import AddCompany from "./features/companies/add/AddCompany";
import SingleCompany from "./features/companies/view/SingleCompany";
import UsersList from "./features/users/list/UsersList";
import AddUser from "./features/users/add/AddUser";
import SingleUser from "./features/users/view/SingleUser";
import LoginPage from "./features/auth/login/LoginPage";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SiteLayout />}>
          <Route index element={<h1>Site</h1>} />
          <Route path="login" element={<LoginPage />} />
            <Route element={<PersistLogin />} >
              <Route element={<RequireAuth allowRoles={["Admin", "User"]} />}>
                <Route path="/dash" element={<DashLayout />}>
                  <Route index element={<h1>Dashboard</h1>} />
                  <Route element={<RequireAuth allowRoles={["Admin"]} />}>
                    <Route path="users" element={<Outlet />}>
                      <Route index element={<UsersList />} />
                      <Route path="add" element={<AddUser />} />
                      <Route path=":userId" element={<SingleUser />} />
                    </Route>
                    <Route path="companies" element={<Outlet />}>
                      <Route index element={<CompaniesList />} />
                      <Route path="add" element={<AddCompany />} />
                      <Route path=":companyId" element={<SingleCompany />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
