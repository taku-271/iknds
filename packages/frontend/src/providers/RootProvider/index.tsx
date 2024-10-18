import { UIProvider } from "@yamada-ui/react";
import Head from "next/head";
import { ReactNode } from "react";

/**
 * htmlタグやheadタグを提供するProvider
 *
 * @public
 * @param children 子要素 (ReactNode)
 */
export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
      <Head>
        <title>ikds</title>
        <meta charSet="utf-8" />
      </Head>
      <body>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
};
