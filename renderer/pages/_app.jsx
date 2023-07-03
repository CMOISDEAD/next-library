import {
  NotificationProvider,
  NotificationConsumer,
} from "doom-react-notifications";
import Layout from "../components/layout";
import "doom-react-notifications/dist/style.css";
import "../styles/global.css";
import { Notify } from "../components/Notify";

function MyApp({ Component, pageProps }) {
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
