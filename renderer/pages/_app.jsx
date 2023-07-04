import electron from "electron";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { Notify } from "../components/layout/Notify";
import Layout from "../components/layout/layout";
import "../styles/global.css";

import {
  NotificationProvider,
  NotificationConsumer,
} from "doom-react-notifications";
import "doom-react-notifications/dist/style.css";

const ipcRenderer = electron.ipcRenderer || false;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const books = ipcRenderer.sendSync("get-books") || [];
    const recently = ipcRenderer.sendSync("get-recent") || [];
    const selected = ipcRenderer.sendSync("get-current") || {};
    const theme = ipcRenderer.sendSync("get-theme") || [];
    const categories = ipcRenderer.sendSync("get-categories") || [];
    useStore.setState({
      books,
      recently,
      selected,
      theme,
      categories,
    });
  }, []);

  return (
    <NotificationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div className="sticky bottom-0 z-50 mr-2">
        <NotificationConsumer Custom={Notify} />
      </div>
    </NotificationProvider>
  );
}

export default MyApp;
