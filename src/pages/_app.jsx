import "../styles/globals.css";
import "da-insight-sdk/dist/styles.css";
import "da-apps-sdk/styles";
import { HelpdeskLayout } from "../modules/container/layouts/HelpdeskLayout";
import { AuthProvider } from "../modules/container/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <HelpdeskLayout>
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </HelpdeskLayout>
    </AuthProvider>
  );
}
