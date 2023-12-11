import Breadcrumb from "../components/Breadcrumb";
import TableOne from "../components/TableOne";
import { Link } from "react-router-dom";
// import TableTwo from "../components/TableTwo";
import add from "../images/icon/icons8-add-64.png";
import edit from "../images/icon/edit.png";
// import { Props } from "react-apexcharts";
import { useEffect, useState } from "react";
import axios, { all } from "axios";

interface Transaction {
  serial: number;
  description: string;
  category: string;
  total: number;
}
const Transactions = () => {
  const getUser = localStorage.getItem("user");
  const [list, setlist] = useState<Array<Transaction>>([]);
  const [hash, sethash] = useState<Array<number>>([]);

  const [list2, setlist2] = useState<Array<Transaction>>([]);
  const [hash2, sethash2] = useState<Array<number>>([]);

  const [listall, setlistall] = useState<Array<Transaction>>([]);
  const [hashall, sethashall] = useState<Array<number>>([]);
  useEffect(() => {
    async function submit() {
      if (getUser) {
        const usr = JSON.parse(getUser);
        const _id = usr._id;
        const d = new Date();
        const less = new Date(Date.now()+864e5);
        const ts = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
        const ts2 = Date.UTC(less.getFullYear(), less.getMonth(), less.getDate());
        const date_ = new Date(ts).toISOString();
        const lessthandate = new Date(ts2).toISOString();
        let res = await axios.post("https://budgetserver-7ip1.onrender.com/expense/byDate", {
          _id,
          date : date_,
          lessthandate
        });
        const l = new Date(Date.now()-864e5);
        const ts_ = Date.UTC(l.getFullYear(), l.getMonth(), l.getDate());
        const lastdate = new Date(ts_).toISOString();
        let res2 = await axios.post("https://budgetserver-7ip1.onrender.com/expense/byDate", {
          _id,
          date : lastdate,
          lessthandate : date_,
        });
        if (res && res.data && res.data.data) {
          const data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            const newExp: Transaction = {
              serial: i + 1,
              description: data[i].description,
              category: data[i].category,
              total: data[i].cost,
            };
            if (!hash.includes(i + 1)) {
              sethash((hash) => [...hash, i + 1]);
              setlist((list) => [...list, newExp]);
            }
          }
        }

        let all = await axios.post("https://budgetserver-7ip1.onrender.com/expense/all",{_id});
        if(all && all.data && all.data.data){
          const data = all.data.data;
          for(let i=0;i<data.length;i++){
            const newex : Transaction = {
              serial: i + 1,
              description: data[i].description,
              category: data[i].category,
              total: data[i].cost,
            };
            if(!hashall.includes(i+1)){
              sethashall((hash2) => [...hash2, i + 1]);
              setlistall((list2) => [...list2, newex])
            }
          }
        }

        if (res2 && res2.data && res2.data.data) {
          const data = res2.data.data;
          for (let i = 0; i < data.length; i++) {
            const newExp: Transaction = {
              serial: i + 1,
              description: data[i].description,
              category: data[i].category,
              total: data[i].cost,
            };
            if (!hash2.includes(i + 1)) {
              sethash2((hash2) => [...hash2, i + 1]);
              setlist2((list2) => [...list2, newExp]);
            }
          }
        }
      }
    }
    submit();
  }, []);
  return (
    <>
      <Breadcrumb pageName="Transaction" />

      <div className="flex flex-col gap-10 ">
        <div className="flex flex-wrap gap-5 xl:gap-7.5 ">
          <Link
            // ref={trigger}
            // onClick={() => setaddOpen(!addOpen)}
            to="/addTransaction"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#5B39CF] py-4 px-10 text-center font-medium text-white hover:bg-[#8D80EE] lg:px-8 xl:px-10 dark:border-strokedark dark:bg-boxdark dark:hover:bg-[#394452]"
          >
            <img src={add} className="h-5 w-5" alt="" />
            Add Transaction
          </Link>
        </div>
        {/* <TableTwo title="Today's Transactions" /> */}
        <div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 px-4 md:px-6 xl:px-7.5">
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Today's Transactions
              </h4>
            </div>

            <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Serial</p>
              </div>
              <div className="col-span-3 flex items-center">
                <p className="font-medium">Description</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Category</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Total Paid</p>
              </div>
            </div>
            {list.map((trans, ind) => (
              <div
                key={ind}
                className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {ind + 1}{" "}
                  </p>
                </div>
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p className="text-black dark:text-white">
                      {trans.description}
                    </p>
                    {/* <img src={edit} className="h-6 w-6 ml-1" /> */}
                  </div>
                </div>

                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-black dark:text-white">{trans.category}</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-black dark:text-white">
                    Rs. {trans.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <TableTwo title="Yesterday's Transactions" /> */}

        <div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 px-4 md:px-6 xl:px-7.5">
              <h4 className="text-xl font-semibold text-black dark:text-white">
                Yesterday's Transactions
              </h4>
            </div>

            <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Serial</p>
              </div>
              <div className="col-span-3 flex items-center">
                <p className="font-medium">Description</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Category</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Total Paid</p>
              </div>
            </div>
            {list2.map((trans, ind) => (
              <div
                key={ind}
                className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {ind + 1}{" "}
                  </p>
                </div>
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p className="text-black dark:text-white">
                      {trans.description}
                    </p>
                    {/* <img src={edit} className="h-6 w-6 ml-1" /> */}
                  </div>
                </div>

                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-black dark:text-white">{trans.category}</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-black dark:text-white">
                    Rs. {trans.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-6 px-4 md:px-6 xl:px-7.5">
              <h4 className="text-xl font-semibold text-black dark:text-white">
                All Transactions
              </h4>
            </div>

            <div className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Serial</p>
              </div>
              <div className="col-span-3 flex items-center">
                <p className="font-medium">Description</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="font-medium">Category</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="font-medium">Total Paid</p>
              </div>
            </div>
            {listall.map((trans, ind) => (
              <div
                key={ind}
                className="grid grid-cols-5 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5"
              >
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-black dark:text-white">
                    {ind + 1}{" "}
                  </p>
                </div>
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <p className="text-black dark:text-white">
                      {trans.description}
                    </p>
                    {/* <img src={edit} className="h-6 w-6 ml-1" /> */}
                  </div>
                </div>

                <div className="col-span-2 hidden items-center sm:flex">
                  <p className="text-black dark:text-white">{trans.category}</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <p className="text-black dark:text-white">
                    Rs. {trans.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        

      </div>
    </>
  );
};

export default Transactions;
