import { SidebarLayout } from "@/modules/layouts/SidebarLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SidebarLayout>
      <Component {...pageProps} />
    </SidebarLayout>
  );
}
