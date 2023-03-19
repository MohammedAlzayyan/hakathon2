import { Button, HelperText, Modal } from "components";
import { useModal, useSwrMutationFetch } from "hooks";
import React, { useState } from "react";
import TransferCard from "../TransferCard";
import { API_SERVICES_URLS } from "data";

export function DeleteModal({
  item,
  deleteModalObj,
  recipientID,
  deleteRecipient,
}) {
  const [error, setError] = useState("");
  const { trigger, isMutating } = useSwrMutationFetch(
    API_SERVICES_URLS.FREELANCER.RECIPIENT_DELETE(recipientID),
    {
      method: "DELETE",
      headers: {},
    }
  );
  const handleDeleteClick = async () => {
    const response = await trigger();

    if (response.status == "failed") {
      setError(response.message);
      return;
    }
    // delete recipient from state
    deleteRecipient();
    deleteModalObj.closeModal();
  };

  return (
    <Modal {...deleteModalObj} className="!w-[350px] ">
      <TransferCard centerTitle={false} closeModal={deleteModalObj.closeModal}>
        <div className="mb-5 ">
          <p>Are you sure you want to delete this {item}?</p>
        </div>
        <div className="flex gap-3">
          <Button
            fullWidth={true}
            className="bg-white hover:bg-white text-black border-gray-100 border-2"
            onClick={deleteModalObj.closeModal}
          >
            Cancel
          </Button>
          <Button
            fullWidth={true}
            className="bg-red hover:bg-red"
            onClick={handleDeleteClick}
          >
            {isMutating ? "Loading..." : "Delete"}
          </Button>
        </div>
        {error && (
          <HelperText
            className="text-red w-full text-xs justify-center min-h-[20px]"
            text={error}
          />
        )}
      </TransferCard>
    </Modal>
  );
}

export default DeleteModal;
