import React from "react";
import type { NextPageWithLayout } from "types";
import NestedLayout from "layouts/NestedLayout";
import { BalanceCard, MainSide } from "layouts/NestedLayout/components";
import {columns}from "features/payout/data"
import Transaction from "features/payout/withdraw/components/Transaction";



const Transactions: NextPageWithLayout = () => {
  return <NestedLayout left={MainSide} right={BalanceCard}>
    <Transaction  columns={columns}/>
  </NestedLayout>;
};
Transactions.mainLayoutProps = {
  title: "Talents Valley Home",
  pageDescription: "Home page description",
  contentClassName: "!items-start !justify-start",
};

export default Transactions;
