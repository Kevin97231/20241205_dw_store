import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "", element: <>Page d'accueil</> },
        { path: "/products", element: <>page products</> },
        { path: "*", element: <>404 NOT FOUND</> },
      ],
    },
  ]);

  function Root() {
    return (
      // <Navbar />
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
