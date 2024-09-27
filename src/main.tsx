import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";

import Root from "./routes/Root.tsx";
import SignIn from "./routes/SignIn.tsx";
import SignUp from "./routes/SignUp.tsx";
import Chats from "./routes/Chats.tsx";
import Chat from "./routes/Chat.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-Up", element: <SignUp /> },
      { path: "/chats", element: <Chats /> },
      { path: "/chats/:chatId", element: <Chat /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
