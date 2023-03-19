import type { NextPageWithLayout } from "types";
import NestedLayout from "layouts/NestedLayout";
import { BalanceCard, MainSide } from "layouts/NestedLayout/components";
import { WithdrawWrapper } from "features/payout";

const Withdraw: NextPageWithLayout = () => {
    return (
        <NestedLayout left={MainSide} right={BalanceCard} >
            <WithdrawWrapper />
        </NestedLayout>
    );
};

Withdraw.mainLayoutProps = {
    title: "Talents Valley Withdraw",
    pageDescription: "Withdraw page description",
    withoutBalanceCard: false,
    contentClassName: "!items-start !justify-start",
};

export default Withdraw;