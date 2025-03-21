import "../styles/globals.css";
import "da-insight-sdk/dist/styles.css";
import { SidebarLayout } from "../modules/insights/common/layout/SidebarLayout";
import { InsightContextProvider } from "da-insight-sdk";

const dataApiURL =
  process.env.NEXT_PUBLIC_PRODUCT_MODE === "LITE"
    ? "https://dametrics.dataactions.ai/InsightPreviewLite?get_query=false"
    : "https://dametrics.dataactions.ai/InsightPreview?get_query=false";

const dimensionsApiURL =
  process.env.NEXT_PUBLIC_PRODUCT_MODE === "LITE"
    ? "https://dametrics.dataactions.ai/data-dimensions-values-lite"
    : "https://dametrics.dataactions.ai/data-dimensions-values";

export default function App({ Component, pageProps }) {
  return (
    <SidebarLayout>
      <InsightContextProvider dataApiURL={dataApiURL} dimensionsApiURL={dimensionsApiURL}>
        <Component {...pageProps} />
      </InsightContextProvider>
    </SidebarLayout>
  );
}
