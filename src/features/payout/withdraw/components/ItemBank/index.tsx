import { Image, Button } from "components";
import { useState } from "react";
import { MiniCard } from "../MiniCard";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import { getCookie } from "lib/js-cookie";
import axios from "axios";
import { COOKIES_KEYS } from "data";
import { useSWR } from "lib/swr";

import ModalAddBankAccount from "../ModalAddBankAccount";
import ModalDelete from "../ModalDelete";
import useModal from "hooks/useModal";
import Modal from "components/Modal";
import TransferCard from "../TransferCard";

import useFetch from "../../hook/useFetch";

export const ItemBank = ({
  bank,
  selectedItemBank,
  setSelectedItemBank = (f) => f,
}: any) => {
  const modalEditBank = useModal();
  const modalDeleteBank = useModal();

  const [data, setData] = useState([]);
  const currentUser = getCookie(COOKIES_KEYS.currentUser);

  const { fetchData, isLoading, error } = useFetch();

  const handleEdit = async (id: any) => {
    const formData = {
      accountName: bank.accountName,
      accountNumber: bank.accountNumber,
      bankBranch: bank.bankBranch,
      ledger: bank.ledger,
      bankId: id,
    };

    console.log(formData);

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentUser?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fetchData),
    };
    // const data = await fetchData(options, `bank/send-code`);
    // setData(data.data);

    // return data;
  };

  // console.log(Object.keys(selectedItemBank));

  return (
    <div
      onClick={() => {
        setSelectedItemBank(bank);
      }}
      className="cursor-pointer mt-2"
    >
      <MiniCard
        className={`${
          selectedItemBank._id === bank._id ? "border-blue-dark" : ""
        }`}
      >
        <div className="flex justify-between">
          <p className="font-semibold text-xl">{bank.accountName}</p>
          <div className="flex gap-3 ">
            <DeleteIcon
              className="w-5 cursor-pointer"
              onClick={() => modalDeleteBank.openModal()}
            />
            <EditIcon
              className="w-5 cursor-pointer"
              onClick={() => {
                setSelectedItemBank(bank);
                modalEditBank.openModal();
              }}
            />
          </div>
        </div>
        <div>
          <p className="text-xl">
            {bank?.accountNumber}-001-{bank?.ledger}-000
          </p>
        </div>
      </MiniCard>

      {/* Modal for edit bank account */}
      <Modal {...modalEditBank} className="!w-[700px] !px-24">
        <TransferCard
          centerTitle={false}
          title="Add Bank Account"
          closeModal={modalEditBank.closeModal}
        >
          <ModalAddBankAccount
            selectedItemBank={selectedItemBank}
            modalEditBank={modalEditBank}
          />
        </TransferCard>
      </Modal>
      {/* Modal for delete bank account */}
      <Modal {...modalDeleteBank} className="!w-[700px] !px-24">
        <ModalDelete bank={bank} modalDeleteBank={modalDeleteBank} />
      </Modal>
    </div>
  );
};
export default ItemBank;
