import "../styles/globals.css";
import "da-insight-sdk/dist/styles.css";
import "da-apps-sdk/styles";
import { SidebarLayout } from "../modules/container/layouts/SidebarLayout";
import { SidebarContextProvider } from "../modules/container/contexts/SidebarContext";
import { AuthProvider } from "../modules/container/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

function AppContent({ Component, pageProps }) {
  return (
    <SidebarContextProvider>
      <SidebarLayout>
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </SidebarLayout>
    </SidebarContextProvider>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}
