import { Button, Divider, Input, Image } from "components";
import Modal from "components/Modal";
import { TransferCard } from "../TransferCard";
import useModal from "hooks/useModal";
// import { PlusIconMini, ChevronDownIconMini } from "lib/@heroicons";
import { PlusIcon, ArrowDownIcon } from "lib/@heroicons";

import ListOfBanks from "../ListOfBanks";
import WithdrawPreview from "../WithdrawPreview";
import ModalAddBankAccount from "../ModalAddBankAccount";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";
import axios from "axios";
import { useSWR } from "lib/swr";
import useFetch from "../../hook/useFetch";

import SelectList from "../SelectList";
import { Listbox } from "@headlessui/react";

export const Bank = ({ selectedBalance }: any) => {
  const modalAddBank = useModal();
  const modalBankList = useModal();
  const modalWithdraw = useModal();

  const [amount, setAmount] = useState(0);

  const currentUser = getCookie(COOKIES_KEYS.currentUser);
  const [listofBanks, setListofBanks] = useState([]);

  const [selectedBank, setSelectedBank] = useState();

  const { fetchData, isLoading, error } = useFetch();

  useEffect(() => {
    const listOfBanks = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentUser?.accessToken}`,
          "Content-Type": "application/json",
        },
      };
      const res = await fetchData(options, `bank/listing?offset=0&limit=10`);
      setListofBanks(res.data.banks);
    };
    listOfBanks();

    // if (selectedBank) {
    //   setSelectedBank(() => selectedBank.data.recipients[0]);
    // }
  }, []);

  return (
    <div>
      <div className="mt-6  w-[611px] m-auto">
        {/* <div className="w-60 m-auto">
          <div className="flex justify-between items-center ">
            <p className="font-semibold text-xl">Amount</p>
            <div className="flex gap-1">
              <p className="text-sm text-gray-dark ">Available</p>
              <p
                className="text-base text-blue-light font-semibold cursor-pointer"
                onClick={(e: any) => setAmount(e.target.textContent.slice(1))}
              >
                $240.19
              </p>
            </div>
          </div>
          <Input
            id="amount-input"
            type="text"
            value={amount}
            placeholder="0"
            inputSize="small"
            inputClassName="h-20 text-base text-center font-semibold text-black !text-xl"
            labelClassName="text-gray-dark font-semibold text-lg"
            startIcon={
              <Image
                src="/assets/img/dollar.svg"
                width={30}
                height={30}
                alt="dollar"
              />
            }
            onChange={(e) => setAmount(e.target.value)}
          />
        </div> */}
        <div>
          <div className="flex gap-3 items-center">
            <p className="text-xl font-semibold">Bank</p>
            <p
              className="text-blue-light cursor-pointer"
              onClick={modalBankList.openModal}
            >
              Edit
            </p>
          </div>

          <SelectList
            selected={selectedBank}
            setSelected={setSelectedBank}
            selectedOptionComp={
              selectedBank ? () => <BankOption bank={selectedBank} /> : () => {}
            }
            dir="ltr"
          >
            <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {listofBanks &&
                listofBanks?.map((bank: any, index) => {
                  const isLast = bank.length - 1 != index;
                  return (
                    <BankOption
                      bank={bank}
                      withDivider={isLast}
                      key={bank._id}
                    />
                  );
                })}
            </Listbox.Options>
          </SelectList>

          <p
            className="text-blue-light cursor-pointer flex flex-1 justify-end "
            onClick={modalAddBank.openModal}
          >
            <PlusIcon className="w-5" />
            Add bank account
          </p>

          <Button
            type="button"
            buttonSize="small"
            fullWidth
            className="text-2xl bg-blue-light mt-14"
            onClick={modalWithdraw.openModal}
          >
            Withdraw
          </Button>
        </div>
      </div>
      {/* Modal for edit bank account */}
      <Modal {...modalBankList} className="!w-[700px] !px-14">
        <TransferCard
          centerTitle={false}
          title="Bank Accounts"
          closeModal={modalBankList.closeModal}
        >
          <ListOfBanks
            setSelectedBank={setSelectedBank}
            modalBankList={modalBankList}
          />
        </TransferCard>
      </Modal>
      {/* Modal for Withdraw */}
      <Modal {...modalWithdraw} className="!w-[700px] !px-28">
        <TransferCard
          centerTitle={true}
          title="Withdraw Preview"
          closeModal={modalWithdraw.closeModal}
        >
          <WithdrawPreview
            selectedBank={selectedBank}
            selectedBalance={selectedBalance}
            dir="ltr"
          />
        </TransferCard>
      </Modal>
      {/* Modal for add bank account */}
      <Modal {...modalAddBank} className="!w-[700px] !px-24">
        <TransferCard
          centerTitle={false}
          title="Add Bank Account"
          closeModal={modalAddBank.closeModal}
        >
          <ModalAddBankAccount modalAddBank={modalAddBank} />
        </TransferCard>
      </Modal>
    </div>
  );
};

const BankOption = ({ bank, withDivider }: any) => {
  return (
    <Listbox.Option
      className={`relative cursor-pointer select-none pt-2 pl-6 pr-6 list-none`}
      value={bank}
    >
      <div className={`block truncate`}>
        <div className="flex mb-1">
          <span className="font-bold">{bank.accountName}</span>
        </div>
        <div className="flex justify-between  text-sm text-gray-400">
          <span>{bank.createdAt}</span>
        </div>
      </div>
      {withDivider && <Divider />}
    </Listbox.Option>
  );
};
export default Bank;
