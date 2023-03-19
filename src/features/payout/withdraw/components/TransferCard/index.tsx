import { IconButton } from "components";
import { XMarkIconMini } from "lib/@heroicons";
import { Children } from "types";

export function TransferCard({
  className,
  centerTitle = true,
  title,
  children,
  closeModal,
}: {
  className?: string;
  centerTitle?: boolean;
  title?: string;
  children: Children;
  closeModal?: any;
}) {
  return (
    <div className="relative">
      <div className="">
        {/* x icon */}
        <IconButton
          className="absolute right-0"
          buttonSize="large"
          onClick={closeModal}
        >
          <XMarkIconMini />
        </IconButton>
        <h2
          className={`font-bold text-lg mb-5 text-${
            centerTitle ? "center" : "left"
          }`}
        >
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}

export default TransferCard;
