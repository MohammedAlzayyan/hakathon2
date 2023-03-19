
import type { FC, HTMLProps, ReactNode } from "react";
import type { Children } from "types";

export interface MainLayoutProps extends HTMLProps<HTMLDivElement> {
  children: Children;
  title: string;
  pageDescription?: string;
  withoutNavbar?: boolean;
  withoutMainSide?: boolean;
  withoutBalanceCard?: boolean;
  contentClassName?: string;
}
// type left = {
//   element: React.FunctionComponent<any>
// };
export interface NestedLayoutProps extends HTMLProps<HTMLDivElement> {
  children: Children;
  left:any;
  right: any;
  withoutMainSide?: boolean;
  withoutBalanceCard?: boolean;
  contentClassName?: string;
}
export type MainLayoutType = FC<MainLayoutProps>;
export type NestedLayoutType = FC<NestedLayoutProps>;
