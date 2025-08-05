import { homePage, loginPage, logoutPage } from "./constants";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";

const ROUTES = {
  public: [{ path: loginPage, element: <Login /> }],
  private: [
    { path: homePage, element: <Home /> },
    { path: logoutPage, element: <Logout /> },
  ],
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {ROUTES.public.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {/* Private Routes */}
        <Route>
          {ROUTES.private.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
        {/*NOT FOUND*/}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
