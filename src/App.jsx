import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { DetailProduct } from "./view/DetailProduct";
import { Products } from "./view/Products";
import { CounterRedux } from "./view/CounterRedux";
import { Cart } from "./components/Cart";
import { HomePage } from "./view/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "/products", element: <Products /> },
        { path: "/counter-redux", element: <CounterRedux /> },
        { path: "/panier", element: <Cart /> },

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

function ErrorPage() {
  return <div>Oops ! Quelques chose s&apos;est mal passé</div>;
}
