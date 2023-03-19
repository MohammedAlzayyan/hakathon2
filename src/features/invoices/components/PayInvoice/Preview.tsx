import { Card, Logo, Skeleton } from "components";
import { getFullName } from "utils";
import { usePayInvoice } from "../../contexts/PayInvoice";
import { useInvoicePreview } from "../../hooks";

const Preview = () => {
  const { invoiceId } = usePayInvoice();
  const { preview } = useInvoicePreview(invoiceId);
  const clientFullName = preview
    ? getFullName(preview.client.firstName, preview.client.lastName)
    : "";

  return (
    <Card className="mb-4 shadow-sm border py-8 px-11">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium">
          Invoice{" "}
          <span className="text-xs font-normal">
            #
            {preview?.invoiceNo || (
              <Skeleton
                width={49}
                height={14}
                className="inline-block align-text-bottom"
              />
            )}
          </span>
        </h4>
        <Logo className="cursor-pointer" />
      </div>
      <div className="flex justify-between">
        <div>
          <h5 className="text-gray-dark mt-5 mb-4">From</h5>
          <h6>Talents Valley LLC</h6>
          <p className="text-gray-dark text-sm flex flex-col">
            <span>30 North Gould St.</span>
            <span>Sheridan, Wyoming 82801</span>
            <span>United States</span>
            <span>+1 307-217-6666</span>
          </p>
        </div>
        <div>
          <h5 className="text-gray-dark mt-5 mb-4">Bill To</h5>
          <p>{clientFullName ? clientFullName : <Skeleton width={150} />}</p>
          <span className="text-gray-dark text-sm">
            {preview?.client.email || <Skeleton width={130} className="mt-1" />}
          </span>
          <p className="mt-3">Issue Date</p>
          <span className="text-gray-dark text-sm">
            {preview ? (
              new Date(preview.createdAt).toDateString()
            ) : (
              <Skeleton width={110} />
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start mt-14">
        <p className="text-gray-dark mb-2">Service</p>
        <p className="text-gray-dark mb-2">Amount</p>
      </div>
      {preview ? (
        preview?.fixed.map((item) => (
          <div key={item._id} className="flex justify-between items-start">
            <span>{item.itemName}</span>
            <span>
              {preview.currency} {item.price}
            </span>
          </div>
        ))
      ) : (
        <div className="flex justify-between items-start">
          <span>
            <Skeleton width={160} />
          </span>
          <span>
            <Skeleton width={60} />
          </span>
        </div>
      )}
      <div className="h-px my-3 bg-gray" />
      <div className="ml-auto max-w-max min-w-[160px] text-gray-dark text-sm">
        <p className="flex">
          Sub Total
          <span className="ml-auto">
            {preview ? (
              `${preview?.currency} ${preview.subTotal}`
            ) : (
              <Skeleton width={60} />
            )}
          </span>
        </p>
        <p className="flex">
          Fees
          <span className="ml-auto">
            {preview ? (
              `${preview?.currency} ${preview?.subTotal
                .toString()
                .replaceAll(/[0-9]/g, "0")}`
            ) : (
              <Skeleton width={60} />
            )}
          </span>
        </p>
        <p className="flex">
          Total
          <span className="ml-auto">
            {preview ? (
              `${preview?.currency} ${preview.subTotal}`
            ) : (
              <Skeleton width={60} />
            )}
          </span>
        </p>
      </div>
    </Card>
  );
};

export default Preview;
