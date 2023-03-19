import React, { useEffect, useState } from "react";
import { useSWR } from "lib/swr";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";
import axios from "lib/axios";
import { Button, IconButton, Input } from "components";
import {
  ArrowDownIcon,
  ArrowLeft,
  ArrowRight,
  ChevronIcon,
  SearchIcon,
} from "lib/@heroicons";
import SelectCheckBox from "../SelectCheckBox";
import { options } from "features/payout/data";

const BalanceTransactionsFetcher = async (url: string) => {
  const currentUser = getCookie(COOKIES_KEYS.currentUser);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${currentUser?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  console.log(res.data.data);
  return res.data.data;
};

const Transaction = ({ columns }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [selectedOptions, setSelectedOptions] = useState("pending");
  const [offset, setOffset] = useState(0);
  const [tranPersage, setTranPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useSWR(
    `https://talents-valley-backend.herokuapp.com/api/withdraw/list?offset=${offset}&limit=${tranPersage}&sort=${sort}&filter=${selectedOptions}&search=${search}`,
    BalanceTransactionsFetcher
  );

  const PaginationNext = () => {
    setOffset(offset + tranPersage);
    setCurrentPage(currentPage + 1);
  };
  const PaginationPrev = () => {
    setOffset(offset - tranPersage);
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {isLoading && <div>Loading</div>}
      <p className="my-2 font-[600] text-[#8C8C8C] text-lg">Transactions</p>
      <div className="flex flex-row justify-between align-center -mb-4">
        <Input
          className="w-[50%]"
          placeholder="Search"
          endIcon={<SearchIcon className="w-5 h-5" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex justify-between  ">
          <Button className="flex flex-row h-12 mr-10 bg-white text-[#4375FF] hover:bg-slate-50">
            <ArrowDownIcon className="h-5 w-5 mr-1 " />
            <span>Withdraw</span>
          </Button>
          <SelectCheckBox
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md py-2 ">
        <table className="w-full ">
          <thead>
            <tr className="text-[#9E9E9E] text-left text-base h-[50px]">
              <td className="pl-8 pt-2 flex flex-row content-center">
                Name
                <div className="flex flex-col ml-2 cursor-pointer">
                  <span
                    onClick={() => setSort("office.name" || "bank.bankName")}
                    className="text-xs"
                  >
                    ▲
                  </span>
                  <span
                    onClick={() => setSort("-office.name" || "-bank.bankName")}
                    className="text-xs"
                  >
                    ▼
                  </span>
                </div>
                <span className="pl-8 hover:bg-white flex flex-row content-center ">
                  Data
                  <div className="flex flex-col ml-2 cursor-pointer">
                    <span
                      onClick={() => setSort(`createdAt`)}
                      className="text-xs"
                    >
                      ▲
                    </span>
                    <span
                      onClick={() => setSort(`-createdAt`)}
                      className="text-xs"
                    >
                      ▼
                    </span>
                  </div>
                </span>
              </td>
              {columns.map(
                (column: {
                  id: React.Key | null | undefined;
                  className: string | undefined;
                  header:
                    | string
                    | number
                    | boolean
                    | React.ReactFragment
                    | React.ReactPortal
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | null
                    | undefined;
                }) => (
                  <td key={column.id} className={column.className}>
                    <div className="flex flex-row content-center">
                      {column.header}
                      <div className="flex flex-col ml-2 cursor-pointer">
                        <span
                          onClick={() => setSort(`${column.id}`)}
                          className="text-xs"
                        >
                          ▲
                        </span>
                        <span
                          onClick={() => setSort(`-${column.id}`)}
                          className="text-xs"
                        >
                          ▼
                        </span>
                      </div>
                    </div>
                  </td>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.withdraws?.map(
                (row: {
                  _id: React.Key | null | undefined;
                  typeWithdraw: string;
                  office: {
                    name: string;
                  };
                  bank: {
                    bankName: string;

                    accountName: string;
                  };
                  createdAt:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined;
                  amount: {
                    toString: () => string | number;
                  };
                  recipient: {
                    name: string;
                  };
                  status: string;
                }) => (
                  <tr key={row._id} className="border-y text-base h-[75px]">
                    {
                      <>
                        <td className="pl-8 text-[#707070] font-[600]">
                          {row.typeWithdraw === "cash" ? (
                            <td>{row.office.name}</td>
                          ) : (
                            <td>{row.bank.bankName}</td>
                          )}
                          <p className="text-[#BEC2C6] text-sm font-normal">
                            {row.createdAt}
                          </p>
                        </td>
                        <td className="text-[#151617] font-[600]">
                          ${row.amount.toString()}
                        </td>
                        <td className="text-[#707070]">
                          {row.typeWithdraw === "cash" ? (
                            <td>{row.recipient.name}</td>
                          ) : (
                            <td>{row.bank.accountName}</td>
                          )}
                        </td>
                        <td className="font-[600]">
                          {row.status}
                          <p className="text-[#BEC2C6] text-sm font-normal">
                            {row.status === "pending"
                              ? "Expected within 24 hours"
                              : null}
                          </p>
                        </td>
                      </>
                    }
                  </tr>
                )
              )}
            <tr>
              <td></td>
              <td className=" text-[#9E9E9E] flex content-center  ">
                <IconButton>
                  <ArrowLeft
                    className="text-[#9E9E9E]"
                    onClick={PaginationPrev}
                  />
                </IconButton>
                <span className="pt-1">Page {currentPage} - 10</span>
                <IconButton>
                  <ArrowRight
                    className="text-[#9E9E9E]"
                    onClick={PaginationNext}
                  />
                </IconButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transaction;
