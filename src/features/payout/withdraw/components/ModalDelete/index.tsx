import { Button } from "components";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";

import useFetch from "../../hook/useFetch";

export const ModalDelete = ({ modalDeleteBank, bank }: any) => {
  const currentUser = getCookie(COOKIES_KEYS.currentUser);

  const { fetchData, isLoading, error } = useFetch();

  const handleDeleteBank = async (id: string) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${currentUser?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    await fetchData(options, `bank/delete/${id}`);
  };

  console.log(bank);

  return (
    <div className="">
      <p>Are you sure you want to delete this bank account?</p>
      <div className="flex gap-4 mt-8">
        <Button
          type="button"
          buttonSize="small"
          fullWidth
          className="bg-white border text-2xl border-gray-dark !text-black hover:!text-white"
          onClick={() => modalDeleteBank.closeModal()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          buttonSize="small"
          fullWidth
          className="text-2xl bg-blue-light"
          onClick={() => handleDeleteBank(bank._id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
export default ModalDelete;
