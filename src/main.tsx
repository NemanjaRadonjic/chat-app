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
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Error from "./components/Error/index.tsx";
import supabase from "./supabase/client.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/sign-in",
        element: <ProtectedRoute fromUser />,
        errorElement: <Error>Something went wrong</Error>,
        children: [
          {
            path: "/sign-in",
            element: <SignIn />,
            errorElement: <Error>Something went wrong</Error>,
          },
        ],
      },
      {
        path: "/sign-up",
        element: <ProtectedRoute fromUser />,
        errorElement: <Error>Something went wrong</Error>,
        children: [
          {
            path: "/sign-up",
            element: <SignUp />,
            errorElement: <Error>Something went wrong</Error>,
          },
        ],
      },
      {
        path: "/chats",
        element: <Chats />,
        loader: async () => await supabase.from("users").select(),
        errorElement: <Error>Something went wrong</Error>,
      },
      {
        path: "/chats/:chatId",
        element: <ProtectedRoute />,
        errorElement: <Error>Something went wrong</Error>,
        children: [
          {
            path: "/chats/:chatId",
            element: <Chat />,
            errorElement: <Error>Something went wrong</Error>,
          },
        ],
      },
      { path: "*", element: <Error>Not Found.</Error> },
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
