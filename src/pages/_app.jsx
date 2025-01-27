import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "da-insight-kit/dist/styles.css";
import { SidebarLayout } from "../modules/insights/common/layout/SidebarLayout";

export default function App({ Component, pageProps }) {
  return (
    <SidebarLayout>
      <ToastContainer />
      <Component {...pageProps} />
    </SidebarLayout>
  );
}
