import { HomeCard } from "components/HomeCard";
import type { NextPageWithLayout } from "types";
import NestedLayout from "layouts/NestedLayout";
import { BalanceCard, MainSide } from "layouts/NestedLayout/components";

const Home: NextPageWithLayout = () => {
  return (
    <NestedLayout left={MainSide} right={BalanceCard} >
      <HomeCard />
    </NestedLayout>
  );
};

Home.mainLayoutProps = {
  title: "Talents Valley Home",
  pageDescription: "Home page description",
  // withoutBalanceCard : false,
  contentClassName: "!items-start !justify-start",
};

export default Home;
