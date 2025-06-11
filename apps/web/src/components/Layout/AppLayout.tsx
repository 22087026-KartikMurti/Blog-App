import type { PropsWithChildren } from "react";
import { Content } from "../Content";
import { LeftMenu } from "./LeftMenu";
import { TopMenu } from "./TopMenu";
import { ThemeProvider } from "../Themes/ThemeContext";

export async function AppLayout({
  children,
  query,
}: PropsWithChildren<{ query?: string }>) {
  return (
    <>
      <ThemeProvider>
      <div className="flex h-screen overflow-hidden">
        <div className="w-64 h-full overflow-y-auto text-[color:var(--text)]">
          <LeftMenu />
        </div>
        <div className="flex-1 h-screen overflow-y-auto text-[color:var(--text)]">
          <TopMenu query={query} />
          <Content>
            {children}
          </Content>
        </div>
      </div>
      </ThemeProvider>
    </>
  );
}
