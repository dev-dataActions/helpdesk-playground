import "../styles/globals.css";
import "da-insight-sdk/dist/styles.css";
import { SidebarLayout } from "../modules/insights/common/layout/SidebarLayout";

export default function App({ Component, pageProps }) {
  return (
    <SidebarLayout>
      <Component {...pageProps} />
    </SidebarLayout>
  );
}
