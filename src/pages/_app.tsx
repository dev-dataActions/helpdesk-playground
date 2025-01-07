import { SidebarLayout } from "@/modules/layouts/SidebarLayout";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import "da-insight-kit/dist/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SidebarLayout>
      <ToastContainer />
      <Component {...pageProps} />
    </SidebarLayout>
  );
}
