// import { useEffect, useRef, useState } from "react";
// import Breadcrumb from "../components/Breadcrumb";

// const AddTransaction = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [whoPaid, setwhoPaid] = useState<string>();
//   const [inputList, setInputList] = useState<string[]>([
//     "Sahib Singh",
//     "Kush",
//     "Amritpal Singh",
//   ]);
//   // const [selectedFriends, setselectedFriends] = useState<string[]>([]);
//   const [checkedState, setCheckedState] = useState(
//     new Array(inputList.length).fill(false)
//   );
//   const [paidAmount, setpaidAmount] = useState<number[]>(
//     new Array(inputList.length).fill(0)
//   );
//   const trigger = useRef<any>(null);
//   const dropdown = useRef<any>(null);
//   useEffect(() => {
//     //import all friends here and update inputList
//     // const allFriends = fetch("");
//     // const allFriends = "Sahib Singh";
//     // if (!allFriends) setInputList(allFriends);
//   });
//   useEffect(() => {
//     const clickHandler = ({ target }: MouseEvent) => {
//       if (!dropdown.current) return;
//       if (
//         !dropdownOpen ||
//         dropdown.current.contains(target) ||
//         trigger.current.contains(target)
//       )
//         return;
//       setDropdownOpen(false);
//     };
//     document.addEventListener("click", clickHandler);
//     return () => document.removeEventListener("click", clickHandler);
//   });

//   // close if the esc key is pressed
//   useEffect(() => {
//     const keyHandler = ({ keyCode }: KeyboardEvent) => {
//       if (!dropdownOpen || keyCode !== 27) return;
//       setDropdownOpen(false);
//     };
//     document.addEventListener("keydown", keyHandler);
//     console.log(paidAmount);
//     return () => document.removeEventListener("keydown", keyHandler);
//   });

//   const selectedFriendsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const updatedCheckedState = checkedState.map((checked, index) =>
//       index.toString() === e.target.value ? !checked : checked
//     );
//     setCheckedState(updatedCheckedState);
//   };
//   const whoPaidHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setwhoPaid(e.target.value);
//   };
//   const paidAmountHandler = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     i: string
//   ) => {
//     const updatedpaidAmount = paidAmount.map((amt, index) =>
//       index.toString() === i ? e.target.valueAsNumber : amt
//     );
//     setpaidAmount(updatedpaidAmount);
//   };
//   return (
//     <>
//       <Breadcrumb pageName="AddTransaction" />
//       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <form action="#">
//           <div className="p-3">
//             <div className="mb-4.5">
//               <label className="mb-1 block text-black dark:text-white">
//                 Select A Group OR Individuals
//               </label>
//               <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                 <div className="w-full xl:w-1/2">
//                   <select className=" z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
//                     <option value="0">Select the group</option>
//                     <option value="1">Huehue</option>
//                     <option value="2">trip</option>
//                     <option value="3">Canada</option>
//                   </select>
//                 </div>

//                 <div className="w-full xl:w-1/2">
//                   Select Individually
//                   {inputList.map((x: string, i: number) => {
//                     return (
//                       <label
//                         key={i.toString()}
//                         htmlFor="checkboxLabelFive"
//                         className="flex cursor-pointer select-none items-center"
//                       >
//                         <div className="relative mr-3">
//                           <input
//                             id={`id-${i}`}
//                             type="checkbox"
//                             value={i}
//                             // className="sr-only"
//                             onChange={(i) => {
//                               selectedFriendsHandler(i);
//                             }}
//                           />
//                         </div>
//                         {x}
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="mb-1 block text-black dark:text-white">
//                 Note
//               </label>
//               <textarea
//                 rows={1}
//                 placeholder="Type your message"
//                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//               ></textarea>
//             </div>
//             <div className="mb-3">
//               <label className="mb-1 block text-black dark:text-white">
//                 Select Date
//               </label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col mb-3 gap-5.5 p-1">
//               <div>
//                 <label className="mb-1 block text-black dark:text-white">
//                   Attach file
//                 </label>
//                 <input
//                   type="file"
//                   className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
//                 />
//               </div>
//             </div>
//             <div className="w-full">
//               <label className="mb-1.5 block text-black dark:text-white">
//                 Paid By
//               </label>
//               <div className="mb-3 flex flex-col gap-6 xl:flex-row">
//                 <div className="w-full">
//                   <select
//                     onChange={(e) => {
//                       whoPaidHandler(e);
//                     }}
//                     className=" z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                   >
//                     <option value="none"></option>
//                     {inputList.map((x: string, i: number) => {
//                       return (
//                         <option key={i.toString()} value={x}>
//                           {x}
//                         </option>
//                       );
//                     })}
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full">
//               <label className="mb-2.5 block text-black dark:text-white">
//                 Split by Percentage
//               </label>
//               <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                 <div className="w-full">
//                   <ol className=" z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
//                     {inputList.map((x: string, i: number) => {
//                       return checkedState[i] ? (
//                         <li
//                           key={i.toString()}
//                           className="flex flex-col mb-1 gap-5.5 p-1"
//                         >
//                           <div>
//                             {x}
//                             <input
//                               onChange={(e) =>
//                                 paidAmountHandler(e, i.toString())
//                               }
//                               type="number"
//                               className="w-fit ml-5 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//                             />
//                           </div>
//                         </li>
//                       ) : (
//                         ""
//                       );
//                     })}
//                   </ol>
//                 </div>
//               </div>
//             </div>
//             <button className="flex w-full justify-center rounded bg-[#5B39CF] p-3 font-medium text-gray hover:font-bold">
//               Add
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddTransaction;

import axios from "axios";
import React, { useState } from "react";

interface Member {
  member: string;
  email: string;
}

const AddTransaction = () => {
  const getUser = localStorage.getItem("user");
  let usr,
    _id: string,
    _mail: string = "";
  if (getUser) {
    usr = JSON.parse(getUser);
    _id = usr._id;
    _mail = usr.email;
  }
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [totalExpense, setTotalExpense] = useState("");
  const [membersList, setMembersList] = useState<Member[]>([]);
  const [participants, setparticipants] = useState<Array<string>>([_mail]);
  const [newMember, setNewMember] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddGroup = async (e: any) => {
    e.preventDefault();

    const res = await axios.post("https://budgetserver-7ip1.onrender.com/expense/create", {
      description: groupDescription,
      category: selectedCategory,
      email: _mail,
      _id,
      cost: totalExpense,
    });
    if (res && res.data) {
      alert(`Expense added successfully`);
      console.log(res);
    }
    setGroupName("");
    setGroupDescription("");
    setTotalExpense("");
    setMembersList([]);
    setNewMember("");
    setNewMemberEmail("");
    setSelectedCategory("");
  };

  const handleAddMember = () => {
    if (newMember && newMemberEmail) {
      setMembersList([
        ...membersList,
        { member: newMember, email: newMemberEmail },
      ]);
      setparticipants([...participants, newMemberEmail]);
      setNewMember("");
      setNewMemberEmail("");
    }
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembersList = [...membersList];
    updatedMembersList.splice(index, 1);
    setMembersList(updatedMembersList);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleAddGroup} className="p-3">
          {/* <div className="mb-4.5">
            <label
              htmlFor="groupName"
              className="mb-1 block text-black dark:text-white"
            >
              Cost:
            </label>
            <input
              type="number"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div> */}

          <div className="mb-4.5">
            <label
              htmlFor="groupDescription"
              className="mb-1 block text-black dark:text-white"
            >
              Description:
            </label>
            <textarea
              id="groupDescription"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              //rows="4"
              required
              className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>

          <div className="mb-4.5">
            <label
              htmlFor="totalExpense"
              className="mb-1 block text-black dark:text-white"
            >
              Total Expense:
            </label>
            <input
              type="number"
              id="totalExpense"
              value={totalExpense}
              onChange={(e) => setTotalExpense(e.target.value)}
              required
              className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          {/* <div className="mb-4.5">
            <label
              htmlFor="newMember"
              className="mb-1 block text-black dark:text-white"
            >
              New Member:
            </label>
            <div className="flex">
              <input
                type="text"
                id="newMember"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                placeholder="Member's name"
                className="w-full rounded-l border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              <input
                type="text"
                id="newMemberEmail"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Email"
                className="w-full border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              <button
                type="button"
                onClick={handleAddMember}
                className="bg-primary text-white py-2 px-4 rounded-r hover:bg-primary-dark transition"
              >
                Add
              </button>
            </div>
          </div> */}

          {membersList.length > 0 && (
            <div className="mb-4.5">
              <label className="mb-1 block text-black dark:text-white">
                Members:
              </label>
              <ul>
                {membersList.map((member, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <span>
                      {member.member}: {member.email}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mb-4.5">
            <label
              htmlFor="selectedCategory"
              className="mb-1 block text-black dark:text-white"
            >
              Category:
            </label>
            <select
              id="selectedCategory"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="trip">Trip</option>
              <option value="sports">Sports</option>
              <option value="food">Food</option>
              <option value="clothes">Clothes</option>
              <option value="groceries">Groceries</option>
              <option value="personaldev">Personal Development</option>
              <option value="hair">Hair</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTransaction;
