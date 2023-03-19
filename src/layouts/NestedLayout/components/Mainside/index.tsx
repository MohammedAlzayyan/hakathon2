import { useCurrentUser, useLogout } from "features/authentication";
// import { LogoutIcon, SettingIcon } from "lib/@heroicons";
import MenuLinks from "../MainLinks";

export const MainSide = () => {
  const { user } = useCurrentUser();
  const logout = useLogout();

  return (
    <div>
      <h3 className="text-gray-400 mt-2  ml-9 text-lg mb-6 max-sm:hidden">
        Main Menu
      </h3>

      <div className=" flex justify-between flex-col h-[calc(100vh-232px)] ">
        <MenuLinks />
        {/* <div>
          <div className="flex  sm:hover:bg-[#EAEEF2] pl-9 pt-4">
            <SettingIcon className="h-5 w-5 text-gray-500  mb-4 mr-5 max-sm:hover:text-blue-500 max-sm:h-9 max-sm:w-9 max-sm:rounded-md  max-sm:shadow-lg max-sm:p-1  max-sm:border max-sm:border-solid border-[#d1d5da] " />
            <h3 className="text-gray-500 text-sm font-semibold max-sm:hidden">
              Setting
            </h3>
          </div>
          <div className="flex  sm:hover:bg-[#EAEEF2]  pl-9 pt-4">
            <LogoutIcon
              className="h-5 w-5 text-gray-500 mb-4 mr-5 max-sm:hover:text-blue-500 max-sm:h-9 max-sm:w-9 max-sm:rounded-md  max-sm:shadow-lg max-sm:p-1  max-sm:border max-sm:border-solid border-[#d1d5da] "
              onClick={logout}
            />
            <button className="text-gray-500 mb-5 text-sm font-semibold max-sm:hidden">
              Log Out
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};
//mr-2