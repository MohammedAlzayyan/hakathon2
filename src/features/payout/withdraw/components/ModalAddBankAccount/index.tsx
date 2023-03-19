import { Button, Input, Modal, Select } from "components";
import { useState } from "react";
import { MiniCard } from "../MiniCard";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";
import axios from "axios";
import { useSWR } from "lib/swr";
import { useForm, Controller } from "react-hook-form";
import { getFieldHelperText } from "utils";

import Dropdown from "../Dropdown";
import useFetch from "../../hook/useFetch";
import { useModal } from "hooks";
import TransferCard from "../TransferCard";

import ConfirmPayout from "../ConfirmPayout";

export const ModalAddBankAccount = ({
  modalAddBank,
  modalEditBank,
  selectedItemBank,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [values, setValues] = useState({});

  const currentUser = getCookie(COOKIES_KEYS.currentUser);

  const modalVerifyCode = useModal();

  const { fetchData, isLoading, error } = useFetch();

  const branches = [
    {
      value: "Rimal",
      label: "0454 - Rimal",
    },
    {
      value: "Nussairat",
      label: "0448 - Nussairat",
    },
    {
      value: "Main Branch",
      label: "0451 - Main Branch",
    },
    {
      value: "Khan Younis",
      label: "0452 - Khan Younis",
    },
    {
      value: "Jabalia",
      label: "0453 - Jabalia",
    },
    {
      value: "Rafah",
      label: "0454 - Rafah",
    },
  ];

  const ledger = [
    {
      value: "3000",
      label: "3000 - Cuurent",
    },
    {
      value: "3100",
      label: "3100 - Saving",
    },
    {
      value: "3102",
      label: "3102 - Saving For Every Citizen",
    },
  ];

  // const getFilters = (filters: any) => {
  //   return filters.map((filter: any) => {
  //     return "url" + `filter=${filter}}`;
  //   });
  // };

  const onSubmit = async (data: any) => {
    const formData = {
      accountName: data.accountName,
      accountNumber: data.accountNumber,
      bankBranch: data.bankBranch,
      ledger: data.ledger,
    };

    console.log(formData);

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentUser?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: selectedItemBank?._id
        ? JSON.stringify({ ...formData, bankId: selectedItemBank?._id })
        : JSON.stringify({ ...formData }),
    };

    // console.log(
    //   selectedItemBank?._id
    //     ? JSON.stringify({ ...formData, bankId: selectedItemBank?._id })
    //     : JSON.stringify({ ...formData })
    // );
    // console.log(options);

    const dataBank = await fetchData(options, "bank/send-code");

    console.log(dataBank);

    if (dataBank.statusCode === 200) {
      modalVerifyCode.openModal();
      setValues({ ...formData });
    } else {
      console.log("error");
    }
  };

  // console.log(selectedItemBank);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          options={[{ value: "Bank of Palestine", label: "Bank of Palestine" }]}
          id="bank-select"
          label="Bank"
          selectSize="small"
          className="flex-1 basis-full text-gray-dark font-semibold text-lg"
          selectClassName="h-16"
          disabled
        />
        <Input
          id="full-name-input"
          label="Account Owner Full Name"
          inputSize="small"
          inputClassName="h-16 text-base"
          labelClassName="text-gray-dark font-semibold text-lg"
          {...register("accountName", {
            required: "field is empty",
            value: selectedItemBank?.accountName,
          })}
          error={!!errors.name}
          // helperText={getFieldHelperText("error", errors.name?.message)}
        />
        <Select
          options={branches}
          id="branch-select"
          label="Branch"
          selectSize="small"
          className="flex-1 basis-full text-gray-dark font-semibold text-lg"
          selectClassName="h-16"
          {...register("bankBranch", {
            required: "field is empty",
            value: selectedItemBank?.bankBranch,
          })}
        />

        <Input
          id="account-number-input"
          label="Account Number"
          inputSize="small"
          inputClassName="h-16 text-base"
          labelClassName="text-gray-dark font-semibold text-lg"
          {...register("accountNumber", {
            required: "field is empty",
            value: selectedItemBank?.accountNumber,
          })}
          error={!!errors.name}
          // helperText={getFieldHelperText("error", errors.name?.message)}
        />

        <Select
          options={[{ value: "USD", label: "USD" }]}
          id="currency-select"
          label="Currency"
          selectSize="small"
          className="text-gray-dark font-semibold text-lg"
          selectClassName="h-16 bg-gray-light"
          disabled
        />
        <Select
          options={ledger}
          id="ledger-select"
          label="Ledger"
          selectSize="small"
          className="text-gray-dark font-semibold text-lg"
          selectClassName="h-16"
          {...register("ledger", {
            required: "field is empty",
            value: selectedItemBank?.ledger,
          })}
        />

        <Button
          type="submit"
          buttonSize="small"
          fullWidth
          className="text-2xl bg-blue-light"
        >
          Confirm
        </Button>
      </form>
      {/* Modal for Verify code */}
      <Modal {...modalVerifyCode} className="!w-[600px] !px-20">
        <TransferCard
          centerTitle={true}
          title="We need to make sure its you!"
          closeModal={modalVerifyCode.closeModal}
        >
          <ConfirmPayout
            data={values}
            selectedItemBank={selectedItemBank}
            modalVerifyCode={modalVerifyCode}
            modalAddBank={modalAddBank}
            modalEditBank={modalEditBank}
          />
        </TransferCard>
      </Modal>
    </div>
  );
};
export default ModalAddBankAccount;
