import { UIProvider } from "@yamada-ui/react";
import { ReactNode } from "react";

const TopLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
      <head></head>
      <body>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
};

export default TopLayout;
