import { useState } from "react";
import { Button, Input, Modal } from "components";
import { useForm } from "react-hook-form";
import { TransferCard } from "features/payout";
import { getFieldHelperText } from "utils";
import { API_SERVICES_URLS } from "data";
import { useSwrMutationFetch, useModal, useSwrFetch } from "hooks";
import ConfirmPayout from "../ConfirmPayout";

export const EditRecipient = ({ closeModal, handleRecipientAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  const [values, setValues] = useState();
  const [error, setError] = useState();

  const { trigger, isMutating } = useSwrMutationFetch(
    API_SERVICES_URLS.FREELANCER.RECIPIENT_EDIT_BEFORE_CODE,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const verifyModal = useModal();

  const onSubmit = async (data) => {
    const response = await trigger(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-7">
          {/* fullname field */}
          <Input
            type="text"
            name="name"
            label="Recipients Full Name (Arabic)"
            inputSize="small"
            {...register("name", { required: "field is empty" })}
            error={!!errors.name}
            helperText={getFieldHelperText("error", errors.name?.message)}
            placeholder="الاسم ثلاثي بالعربي"
          />
          {/* phone number field */}
          <Input
            type="text"
            label="Recipients Phone Number"
            inputSize="small"
            placeholder="Enter phone number"
            {...register("mobile", { required: "field is empty" })}
            error={!!errors.mobile}
            helperText={getFieldHelperText("error", errors.mobile?.message)}
          />
          {/* ID Number field */}
          <Input
            type="text"
            label="Recipients ID Number (National ID or Passport)"
            inputSize={"small"}
            placeholder="Enter ID number"
            {...register("idNumber", { required: "field is empty" })}
            error={!!errors.idNumber}
            helperText={getFieldHelperText("error", errors.idNumber?.message)}
          />
        </div>
        <div>
          <Button fullWidth={true} type="submit" className="mb-5">
            {isMutating ? "Loading..." : "Confirm"}
          </Button>
          {/* <p className="text-xs text-center text-red">{error && error}</p> */}
        </div>
      </form>
      <Modal {...verifyModal}>
        <TransferCard
          title="We need to make sure its you!"
          centerTitle={true}
          closeModal={verifyModal.closeModal}
        >
          <ConfirmPayout
            // sendCode={useSwrMutationFetch(
            //   API_SERVICES_URLS.FREELANCER.RECIPIENT_CREATE_AFTER_CODE,
            //   {
            //     method: "POST",
            //     headers: {
            //       "content-type": "application/json",
            //     },
            //   }
            // )}
            data={values}
            closeModal={verifyModal.closeModal}
            // handleRecipientAdd={handleRecipientAdd}
          />
        </TransferCard>
      </Modal>
    </>
  );
};

export default EditRecipient;

// type FormEditRecipient = {
//   fullName: string;
//   phone: number;
//   id: number;
// };
