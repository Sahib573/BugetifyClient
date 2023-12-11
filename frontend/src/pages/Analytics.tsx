import Breadcrumb from "../components/Breadcrumb";
import AnalyticsCompareChart from "../components/AnalyticsCompareChart";
import AnalyticsPieChart from "../components/AnalyticsPieChart";
import AnalyticsCompareCategoryChart from "../components/AnalyticsCompareCategoryChart";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
// import ReactApexChart from "react-apexcharts";

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

const Analytics = () => {
  const [state, setState] = useState<series[]>([]);

  const [lastArr, setlastArr] = useState<number[]>([]);
  const [curArr, setcurArr] = useState<number[]>([]);
  const [curCat, setcurCat] = useState<number[]>([]);
  const [lastCat, setlastCat] = useState<number[]>([]);
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
        // console.log(res.data.curArr)
        if (res.data.curArr) setcurArr(res.data.curArr);
        if (res.data.lastArr) setlastArr(res.data.lastArr);
        if (res.data.lastCat) setlastCat(res.data.lastCat);
        if (res.data.curCat) setcurCat(res.data.curCat);
        // console.log(curArr)
        const nw1: series = { name: "Last week", data: lastArr };
        const nw2: series = { name: "Cur week", data: curArr };
        // console.log(state)
        setState([nw1, nw2]);
        // console.log(state);
      }
    }
  }
  useEffect(() => {
    submit();
  }, []);

  // const date = new Date(Date.now()).toDateString();
  // const lastdate = new Date(Date.now() - 7 * 864e5).toDateString();
  return (
    <>
      <Breadcrumb pageName="Analytics" />
      <div className="mt-4 grid grid-cols-10 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 ">


        <AnalyticsCompareChart onClick={submit} last={lastArr} cur={curArr} />
        <AnalyticsCompareCategoryChart last={lastCat} cur={curCat} />
        <AnalyticsPieChart />
      </div>
    </>
  );
};

export default Analytics;
