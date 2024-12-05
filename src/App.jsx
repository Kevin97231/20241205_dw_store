import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { DetailProduct } from "./view/DetailProduct";
import { Products } from "./view/Products";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "", element: <>Page d'accueil</> },
        { path: "/products", element: <Products /> },

        // Si on a plusieurs paramètres mais qu'ils ne font pas partie de la structure principale de l'URL,
        // on peut les transmettre sous forme de "query parameters". Ces paramètres sont ajoutés après ? dans l'URL et sont séparés par &.

        // Exemple d'URL : "/products/123?color=red&size=M"
        { path: "/products/:id", element: <DetailProduct /> },
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
