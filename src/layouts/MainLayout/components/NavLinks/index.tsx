import { Link } from "components";
import { URL_PATHS } from "data";
import {BurgerIcon} from 'lib/@heroicons'
import { useState } from "react";
const NavLinks = () => {
 const [show , setShow] =useState(false)
  return (
    <div className="flex items-center ">
     
      <div className={`flex w-52 bg-white max-md:absolute top-14 right-10  ${show !== false ?"max-md:flex max-md:flex-col ":"max-md:hidden"}`}  >
      <Link
            href={URL_PATHS.HOME}
            className="px-6 transition-colors hover:text-blue"
          >
            Home
          </Link>
          <Link
            href={URL_PATHS.INVOICES.INDEX}
            className="px-6 transition-colors hover:text-blue"
          >
              Invoices
          </Link>
      </div>

            <Link
              href={URL_PATHS.INVOICES.CREATE}
              className="px-6 py-1 text-blue border rounded-full border-blue transition-colors hover:bg-blue hover:text-white max-md:mr-6"
            >
              Create
            </Link>
      <BurgerIcon className="w-6 h-6 pr:10 hidden max-md:block" onClick={()=>{setShow(!show)}}/>
    </div>
  );
};

export default NavLinks;
