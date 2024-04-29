import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { StoryTimeline } from "./StoryTimeline";
import Root from "./root.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        Component: App,
      },
      {
        path: "/story/:storyId",
        element: <StoryTimeline />,
      },
    ],
  },
  // {
  //   path: "/",
  //   element: <App />,
  // },
  // {
  //   path: "/story/:storyId",
  //   element: <StoryTimeline />,
  // },
]);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
