import { PayInvoice, PayInvoiceState } from "features/invoices";
import { NoSsr } from "components";
import type { NextPageWithLayout } from "types";

const PayInvoicePage: NextPageWithLayout = () => {
  return (
    <NoSsr>
      <PayInvoiceState>
        <PayInvoice />
      </PayInvoiceState>
    </NoSsr>
  );
};

PayInvoicePage.mainLayoutProps = {
  title: "Pay Invoice",
  pageDescription: "Pay invoice page description",
  contentClassName: "!items-start",
};

export default PayInvoicePage;
