import Body from "./Components/Body.jsx";
import Home from "./pages/Home.jsx";
import GenerateImage from "./pages/GenerateImage.jsx";
import BuyCredit from "./pages/BuyCredit.jsx";
import ChangePassword from "./Components/ChangePassword.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import EmailVerified from "./Components/EmailVerified.jsx";

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
    {
      path: "/verify-email",
      element: <EmailVerified />,
    },
    {
      path: "/reset-password",
      element: <ChangePassword />,
    },
  ]);

  return (
    <div className="min-h-screen px-4 sm:px-10 md:px-14 lg:px-28 bg-gradient-to-br from-[#E6F0FF] to-[#FFFDE1]">
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
