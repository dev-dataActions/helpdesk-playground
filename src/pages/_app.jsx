import "../styles/globals.css";
import "da-insight-sdk/dist/styles.css";
import { SidebarLayout } from "../modules/insights/common/layouts/SidebarLayout";
import { SidebarContextProvider } from "../modules/insights/common/contexts/SidebarContext";

export default function App({ Component, pageProps }) {
  return (
    <SidebarContextProvider>
      <SidebarLayout>
        <Component {...pageProps} />
      </SidebarLayout>
    </SidebarContextProvider>
  );
}
