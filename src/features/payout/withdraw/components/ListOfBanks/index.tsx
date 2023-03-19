import { Image, Button } from "components";
import { useEffect, useState } from "react";
import { MiniCard } from "../MiniCard";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import { getCookie } from "lib/js-cookie";
import axios from "axios";
import { COOKIES_KEYS } from "data";
import { useSWR } from "lib/swr";

import ModalAddBankAccount from "../ModalAddBankAccount";
import useModal from "hooks/useModal";
import Modal from "components/Modal";
import TransferCard from "../TransferCard";

import ItemBank from "../ItemBank";
import useFetch from "../../hook/useFetch";

export const ListOfBanks = ({
  setSelectedBank = (f) => f,
  modalBankList,
}: any) => {
  const [listofBanks, setListofBanks] = useState([]);
  const [selectedItemBank, setSelectedItemBank] = useState({});
  const modalEditBank = useModal();
  const currentUser = getCookie(COOKIES_KEYS.currentUser);

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
      const res = await fetchData(options, `bank/listing?offset=30&limit=10`);
      setListofBanks(res.data.banks);
      // return res;
    };
    listOfBanks();
    // setListofBanks(listOfBanks());
  }, []);

  return (
    <div className="">
      {listofBanks?.map((bank: any) => {
        return (
          <ItemBank
            bank={bank}
            selectedItemBank={selectedItemBank}
            setSelectedItemBank={setSelectedItemBank}
            key={bank._id}
            // modalBankList={modalBankList}
          />
        );
      })}

      {/* Modal for add bank account */}
      <Modal {...modalEditBank} className="!w-[700px] !px-24">
        <TransferCard
          centerTitle={false}
          title="Add Bank Account"
          closeModal={modalEditBank.closeModal}
        >
          <ModalAddBankAccount />
        </TransferCard>
      </Modal>

      <div className="flex gap-4 mt-14">
        <Button
          type="button"
          buttonSize="small"
          fullWidth
          className="bg-white border text-2xl border-gray-dark !text-black hover:!text-white"
          onClick={() => modalEditBank.openModal()}
        >
          Add
        </Button>
        <Button
          type="submit"
          buttonSize="small"
          fullWidth
          className="text-2xl bg-blue-light"
          onClick={() => {
            modalBankList.closeModal();
            setSelectedBank(selectedItemBank);
          }}
        >
          Select
        </Button>
      </div>
    </div>
  );
};
export default ListOfBanks;
