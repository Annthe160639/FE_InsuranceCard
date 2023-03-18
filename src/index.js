import { ConfigProvider } from "antd";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import vnVN from "antd/lib/locale/vi_VN";

const root = createRoot(document.getElementById("root"));

root.render(
  <ConfigProvider locale={vnVN}>
    <App />
  </ConfigProvider>
);

serviceWorker.unregister();
