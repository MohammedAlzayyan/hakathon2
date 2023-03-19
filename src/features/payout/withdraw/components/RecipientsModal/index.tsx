import React from "react";
import {
  AddRecipient,
  DeleteModal,
  MiniCard,
  TransferCard,
} from "features/payout";
import { Button, IconButton, Image, Modal } from "components";
import { useState } from "react";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import useModal from "hooks/useModal";
import EditRecipient from "../EditRecipient";

function RecipientsModal({
  recipients,
  deleteRecipient,
  addRecipient,
  selectedRecipient,
  setSelectedRecipient,
  closeEditModal,
  editRecipient,
}) {
  const [selectedRecipientID, setSelectedRecipientID] = useState();
  const [beforeSelection, setBeforeSelection] = useState(selectedRecipient);
  const [recipientToChange, setRecipientToChange] = useState();

  const deleteModalObj = useModal();
  const addModalObj = useModal();

  const handleDelete = (_id) => {
    deleteModalObj.openModal();
    setSelectedRecipientID(_id);
  };
  return (
    <>
      <div className="mb-7">
        {recipients.map((r) => (
          <MiniCard
            className={`!py-1 mb-3 cursor-pointer ${
              beforeSelection._id == r._id ? "border-blue-light !border-2" : ""
            }`}
            key={r._id}
            onClick={() => setBeforeSelection(r)}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col sm:flex-row">
                <IconButton onClick={() => handleDelete(r._id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={() => setRecipientToChange(r)}>
                  <EditIcon />
                </IconButton>
              </div>
              <h3 className="text-lg font-semibold text-right">{r.name}</h3>
            </div>
            <div className="flex justify-between items-center">
              <p>ID: {r.idNumber}</p>
              <p>Phone: {r.mobile}</p>
            </div>
          </MiniCard>
        ))}
      </div>
      <div className="flex gap-3">
        <Button
          fullWidth={true}
          className="!bg-transparent !text-blue-light hover:bg-blue hover:text-white border-gray-200 border-2 font-semibold"
          buttonSize="small"
          onClick={addModalObj.openModal}
        >
          Add
        </Button>
        <Button
          fullWidth={true}
          buttonSize="small"
          onClick={() => {
            setSelectedRecipient(beforeSelection);
            closeEditModal();
          }}
        >
          Select
        </Button>
      </div>
      <DeleteModal
        item={"recipient"}
        deleteModalObj={deleteModalObj}
        recipientID={selectedRecipientID}
        deleteRecipient={() => deleteRecipient(selectedRecipientID)}
      />

      <Modal {...addModalObj}>
        <TransferCard
          centerTitle={false}
          title="Add Recipient"
          closeModal={addModalObj.closeModal}
        >
          <AddRecipient
            closeModal={addModalObj.closeModal}
            handleRecipientAdd={(newRecipient) => addRecipient(newRecipient)}
          />
        </TransferCard>
      </Modal>
      <Modal {...addModalObj}>
        <TransferCard
          centerTitle={false}
          title="Add Recipient"
          closeModal={addModalObj.closeModal}
        >
          <EditRecipient
            closeModal={addModalObj.closeModal}
            handleRecipientUpdate={(newRecipient) =>
              editRecipient(newRecipient)
            }
            recipientToChange={recipientToChange}
          />
        </TransferCard>
      </Modal>
    </>
  );
}
export default RecipientsModal;
