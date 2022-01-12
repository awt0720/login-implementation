import "antd/dist/antd.css";
import "../styles/layout.scss";
import "../styles/main.scss";
import "../styles/detail.scss";
import type {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "react-query";
// import SiteLayout from "@components/layout";
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import dynamic from "next/dynamic";

const SiteLayout = dynamic(() => import("@/components/layout"), {ssr: false});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const getLayout =
    (Component as any).getLayout ||
    ((page) => <SiteLayout> {page} </SiteLayout>);

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
}

export default MyApp;
