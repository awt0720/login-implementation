import "../styles/layout.scss";
import "antd/dist/antd.css";
import type {AppProps} from "next/app";
// import SiteLayout from "@components/layout";
import {NextPage} from "next";
import {ReactElement, ReactNode} from "react";
import dynamic from "next/dynamic";

const SiteLayout = dynamic(() => import("@components/layout"), {ssr: false});

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const getLayout =
    (Component as any).getLayout ||
    ((page) => <SiteLayout> {page} </SiteLayout>);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
