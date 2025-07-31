import "../styles/globals.css";
import "da-insight-sdk/dist/styles.css";
import "da-apps-sdk/styles";
import { SidebarLayout } from "../modules/container/layouts/SidebarLayout";
import { SidebarContextProvider } from "../modules/container/contexts/SidebarContext";
import { AuthProvider } from "../modules/container/contexts/AuthContext";
import { ProtectedRoute } from "../modules/container/components/ProtectedRoute";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/next";

function AppContent({ Component, pageProps }) {
  const router = useRouter();

  // Don't protect the login page
  if (router.pathname === "/login") {
    return <Component {...pageProps} />;
  }

  return (
    <ProtectedRoute>
      <SidebarContextProvider>
        <SidebarLayout>
          <Component {...pageProps} />
          <Analytics />
        </SidebarLayout>
      </SidebarContextProvider>
    </ProtectedRoute>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}
