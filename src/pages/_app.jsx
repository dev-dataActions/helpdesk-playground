import "../styles/globals.css";
import "da-insight-sdk/dist/styles.css";
import { SidebarLayout } from "../modules/insights/common/layouts/SidebarLayout";
import { SidebarContextProvider } from "../modules/insights/common/contexts/SidebarContext";
import { AuthProvider } from "../modules/container/contexts/AuthContext";
import { ProtectedRoute } from "../modules/container/components/ProtectedRoute";
import { useRouter } from "next/router";

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
