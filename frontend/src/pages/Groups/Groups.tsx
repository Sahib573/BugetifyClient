import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb.tsx";
import GroupCard from "../../components/GroupCard.tsx";
import { Link } from "react-router-dom";
import add from "../../images/icon/icons8-add-64.png";
import axios from "axios";

interface Group {
  groupName: string;
  description: string;
  totalExpenses: number;
  members: string[];
  amountsOwed: number[];
}

const Groups: React.FC = () => {

  const [group, setGroup] = useState<Array<Group>>([]);
  const getUser = localStorage.getItem("user");

  useEffect(() => {
    async function submit() {
      if (getUser) {
        const usr = JSON.parse(getUser);
        const _id = usr._id;
        const res = await axios.post("https://budgetserver-7ip1.onrender.com/group/getGroups", {
          _id,
        });
        if (res && res.data && res.data.arr) {
          const data = res.data.arr;
          // console.log(data[0].members);
          for (let k = 0; k < data.length; k++) {
            let memArr = [],
              amtArr = [];
            // console.log(data[k].members)
            for (let i = 0; i < data[k].members.length; i++) {
              memArr.push(data[k].members[i].name);
              amtArr.push(data[k].members[i].total);
            }
            const newGroup: Group = {
              groupName: data[k].name,
              description: data[k].description,
              totalExpenses: data[k].total,
              members: memArr,
              amountsOwed: amtArr,
            };
            console.log(newGroup)
            setGroup((group) => [...group, newGroup]);
          }
        }
      }
    }
    submit();
  }, []);

  return (
    <>
      <Breadcrumb pageName="Groups" />
      <div>
        <div className="flex flex-wrap gap-5 xl:gap-7.5 ">
          <Link
            to="/groups/addGroup"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#5B39CF] py-4 px-10 text-center font-medium text-white hover:bg-[#8D80EE] lg:px-8 xl:px-10 dark:border-strokedark dark:bg-boxdark dark:hover:bg-[#394452]"
          >
            <img src={add} className="h-5 w-5" alt="" />
            Add Group
          </Link>
        </div>
        <h1>Show Groups</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          {group.map((group, index) => (
            <div key={index} className="max-h-80">
              <GroupCard
                groupName={group.groupName}
                description={group.description}
                totalExpenses={group.totalExpenses}
                members={group.members}
                amountsOwed={group.amountsOwed}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Groups;
