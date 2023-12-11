import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 1500,
  },
};

interface series {
  name: string;
  data: number[];
}

const AnalyticsCompareChart = (props:any) => {
  // we will fetch both months data from db through backend call and store in this state object
  const [state, setState] = useState<series[]>([]);
  const [lastArr, setlastArr] = useState<number[]>([]);
  const [curArr, setcurArr] = useState<number[]>([]);
  useEffect(() => {
    async function submit() {
      const getUser = localStorage.getItem("user");
      if (getUser) {
        const usr = JSON.parse(getUser);
        const _id = usr._id;
        const d = new Date();
        const ts = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
        const curweekend = new Date(ts).toISOString();

        const d__ = new Date(Date.now() - 7 * 864e5);
        const ts__ = Date.UTC(d__.getFullYear(), d__.getMonth(), d__.getDate());
        const curweekstart = new Date(ts__).toISOString();

        const d2__ = new Date(Date.now() - 14 * 864e5);
        const ts2__ = Date.UTC(
          d2__.getFullYear(),
          d2__.getMonth(),
          d2__.getDate()
        );
        const lastweekstart = new Date(ts2__).toISOString();

        const res = await axios.post(
          "https://budgetserver-7ip1.onrender.com/expense/getAnalytics",
          {
            _id,
            lastweekstart,
            curweekstart,
            curweekend,
          }
        );
        // console.log(res);
        if (res && res.data) {
          if (res.data.curArr) setcurArr((curArr)=>res.data.curArr);
          if (res.data.lastArr) setlastArr((lastArr)=>res.data.lastArr);
          const nw1: series = { name: "Last week", data: lastArr };
          const nw2: series = { name: "Cur week", data: curArr };
          setState((state)=>[nw1, nw2]);
          // console.log(state);
        }
      }
    }
    submit();
  }, []);
  // console.log(state);
  const date = new Date(Date.now()).toDateString();
  const lastdate = new Date(Date.now() - 7 * 864e5).toDateString();
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">
                Spending of Last Week
              </p>
              <p className="text-sm font-medium">{lastdate}</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">
                Spending of Current Week
              </p>
              <p className="text-sm font-medium">{date}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCompareChart;







// <div className="flex w-full max-w-45 justify-end">
// <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
//   <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
//     Day
//   </button>
//   <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
//     Week
//   </button>
//   <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
//     Month
//   </button>
// </div>
// </div>