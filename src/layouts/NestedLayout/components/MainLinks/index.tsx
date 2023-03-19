import { useRouter } from 'next/router';
import { URL_PATHS } from "data";
import { Link } from "components";
import {
    HomeIcon,
    HelpIcon,
    InvoiceIcon,
    PhoneIcon
} from "lib/@heroicons";

const MenuLinks = () => {
    const router = useRouter();
    const currentRoute = router.pathname;
    return (
        <div>
            <div className="text-gray-500 text-sm font-semibold  sm:hover:bg-[#EAEEF2]   ">
            <Link href={URL_PATHS.HOME} className={`flex flex-row pr-12 pl-9 pt-3  ${currentRoute === '/'? "text-blue-500 bg-[#EAEEF2] max-sm:bg-transparent ":undefined}`} >
                <HomeIcon className="h-5 w-5  mb-5 mr-5 max-sm:hover:text-blue-500 max-sm:h-9 max-sm:w-9  max-sm:rounded-md  max-sm:shadow-lg max-sm:p-1  max-sm:border max-sm:border-solid border-[#d1d5da] " title='home' />
                <span className='max-sm:hidden'>Home</span>
            </Link>
            </div>
            <div className="flex text-sm font-semibold text-gray-500 sm:hover:bg-[#EAEEF2]   ">
                <Link href={URL_PATHS.INVOICES.INDEX} className={`flex flex-row pr-12 pl-9  pt-3  ${currentRoute === '/invoices'? "text-blue-500 bg-[#EAEEF2]":undefined}`} >
                <InvoiceIcon className="h-5 w-5  mb-5 mr-5 max-sm:hover:text-blue-500 max-sm:h-9 max-sm:w-9 max-sm:rounded-md  max-sm:shadow-lg max-sm:p-1  max-sm:border max-sm:border-solid border-[#d1d5da] " title='Invoices'/>
                <span className='max-sm:hidden'>Invoices</span>
                </Link>
            </div>

            <div className="flex text-sm font-semibold text-gray-500  sm:hover:bg-[#EAEEF2]  ">
                <Link href={URL_PATHS.INVOICES.INDEX} className={`flex flex-row pr-12 pl-9  pt-3 ${currentRoute === ''? "text-blue-500 bg-[#EAEEF2]":undefined}`}>
                <InvoiceIcon className="h-5 w-5  mb-5 mr-5 max-sm:hover:text-blue-500 max-sm:h-9 max-sm:w-9 max-sm:rounded-md  max-sm:shadow-lg max-sm:p-1  max-sm:border max-sm:border-solid border-[#d1d5da] " title='Withdraw'/>
                <span className='max-sm:hidden'>Withdraw</span>
                </Link>
            </div>

            <div className="flex text-sm font-semibold text-gray-500  sm:hover:bg-[#EAEEF2]  ">
                <Link href={URL_PATHS.HOME} className={`flex flex-row pr-12 pl-9  pt-3 ${currentRoute === ''? "text-blue-500 bg-[#EAEEF2]":undefined}`}>
                <PhoneIcon className="h-5 w-5 mb-5 mr-5 max-sm:hover:text-blue-500 max-sm:h-9 max-sm:w-9 max-sm:rounded-md  max-sm:shadow-lg max-sm:p-1  max-sm:border max-sm:border-solid border-[#d1d5da] " title='Contacts'/>
                <span className='max-sm:hidden'>Contacts</span>
                </Link>
            </div>
            <div className="flex text-sm font-semibold text-gray-500  sm:hover:bg-[#EAEEF2]  ">
                <Link href={URL_PATHS.HOME} className={`flex flex-row pr-12 pl-9  pt-3 ${currentRoute === ''? "text-blue-500 bg-[#EAEEF2]":undefined}`}>
                <HelpIcon className="h-5 w-5 mb-5 mr-5 max-sm:hover:text-blue-500 max-sm:h-9 max-sm:w-9 max-sm:rounded-md  max-sm:shadow-lg max-sm:p-1  max-sm:border max-sm:border-solid border-[#d1d5da] " title='Help' />
                <span className='max-sm:hidden'>Help</span>
                </Link>
            </div>
        </div>
    )
}
export default MenuLinks