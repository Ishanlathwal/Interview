import React, { useEffect } from "react";
import LoginSignup from "./pages/Auth/LoginSignup.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Dashboard/Home.jsx";
import Income from "./pages/Dashboard/Budget.jsx";
import Expense from "./pages/Dashboard/Expense.jsx";
import { useSelector } from "react-redux";
import { RequireAuth, RequireAuthAdmin } from "./Authenticator.jsx";
import store from "./redux/store.js";
import { loadUser } from "./redux/USER_REDUCER.js";
import Loader from "./components/Loader/Loader.jsx";
import Layout from "./pages/Dashboard/Home.jsx";
import Budget from "./pages/Dashboard/Budget.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Admin from "./components/Admin.jsx";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { loading } = useSelector((state) => state.user);

  if (loading) return <Loader />;

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<LoginSignup />} />
          <Route
            path="/main"
            exact
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route
              path="budget"
              exact
              element={
                <RequireAuth>
                  <Budget />
                </RequireAuth>
              }
            />
            <Route
              index
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path="expense"
              exact
              element={
                <RequireAuth>
                  <Expense />
                </RequireAuth>
              }
            />
            <Route
              path="admin"
              exact
              element={
                <RequireAuthAdmin>
                  <Admin />
                </RequireAuthAdmin>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const Root = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  if (loading) return <Loader />;
  return isAuthenticated ? <Navigate to="/main" /> : <Navigate to="login" />;
};
