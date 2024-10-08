import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CartContextProvider from "./Context/CartContext.jsx";
import UserTokenContextProvider from "./Context/UserTokenContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <UserTokenContextProvider>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </UserTokenContextProvider>
  // </StrictMode>,
);
