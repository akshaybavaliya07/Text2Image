import Body from "./Components/Body.jsx";
import Home from "./pages/Home.jsx";
import GenerateImage from "./pages/GenerateImage.jsx";
import BuyCredit from "./pages/BuyCredit.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/generate",
          element: <GenerateImage />,
        },
        {
          path: "/buy-credits",
          element: <BuyCredit />,
        },
      ],
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 px-4 sm:px-10 md:px-14 lg:px-28 ">
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
