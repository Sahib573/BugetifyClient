import axios from "axios";
import React, { useState } from "react";

interface Member {
  member: string;
  email: string;
}

const AddGroupForm = () => {
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

    const res = await axios.post("https://budgetserver-7ip1.onrender.com/group/create", {
      name: groupName,
      description: groupDescription,
      category: selectedCategory,
      creater_mail: _mail,
      created_by: _id,
      total: totalExpense,
      participants,
    });
    if (res && res.data) {
      alert(`${groupName} added successfully`);
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
          <div className="mb-4.5">
            <label
              htmlFor="groupName"
              className="mb-1 block text-black dark:text-white"
            >
              Group Name:
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

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
          <div className="mb-4.5">
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
          </div>

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
              <option value="friends">Friends</option>
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
            Add Group
          </button>
        </form>
      </div>
    </>
  );
};

export default AddGroupForm;
