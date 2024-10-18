import { RootProvider } from "@/providers/RootProvider";
import { ReactNode } from "react";

const TopLayout = ({ children }: { children: ReactNode }) => {
  return <RootProvider>{children}</RootProvider>;
};

export default TopLayout;
