import { useEffect, useState } from "react";
import img1 from "../images/user/user-02.png";
import img2 from "../images/user/user-03.png";
import img3 from "../images/user/user-04.png";
import add from "../images/icon/icons8-add-64.png";
import minus from "../images/icon/icons8-minus-48.png";
import axios from "axios";

interface Friend {
  url: string;
  email: string;
  name: string;
  mobile: number;
  address: string;
}
const Friends = () => {
  const [contactList, setcontactList] = useState<Array<Friend>>([
    // {
    //   url: img2,
    //   email: "sahib@gmail.com",
    //   name: "sahib singh",
    //   mobile: 7056953669,
    //   address: "Kurukshetra",
    // },
    // {
    //   url: img3,
    //   email: "kush@gmail.com",
    //   name: "Kush Aggarwal",
    //   mobile: 7056953669,
    //   address:"Kaithal",
    // },
    // {
    //   url: img1,
    //   email: "Ayushi@gmail.com",
    //   name: "Ayushi Gupta",
    //   mobile: 7056953669,
    //   address:"Kurukshetra",
    // },
  ]);
  const [update, setupdate] = useState<boolean>(false);
  const [list, setlist] = useState<Array<String>>([]);
  const getUser = localStorage.getItem("user");
  useEffect(() => {
    setcontactList([]);
    setlist([]);
    async function submit() {
      if (getUser) {
        const usr = JSON.parse(getUser);
        const _id = usr._id;
        let res = await axios.post("https://budgetserver-7ip1.onrender.com/user/getFriends", {
          _id,
        });
        res = res.data;
        if (res && res.data) {
          for (let i = 0; i < res.data.length; i++) {
            if (
              res.data[i].name &&
              res.data[i].email &&
              res.data[i].contactNo &&
              res.data[i].address
            ) {
              
              const newfriend: Friend = {
                url: (i%2)?img1:img2,
                email: res.data[i].email,
                name: res.data[i].name,
                mobile: res.data[i].contactNo,
                address: res.data[i].address,
              };
              const fid = res.data[i].frind_id.toString();
              let flag = true;
              for (let i = 0; i < list.length; i++) {
                if (list[i].localeCompare(fid) == 0) flag = false;
              }
              if (flag) {
                setcontactList((contactList) => [
                  ...(contactList),
                  newfriend,
                ]);
                setlist((list) => [...(list), fid]);
              }
            } else {
              console.log("err");
            }
          }
        }
      }
    }
    console.log(123);
    submit();
  }, [update]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (getUser) {
      const usr = JSON.parse(getUser);
      const _id = usr._id;
      const res = await axios.post("https://budgetserver-7ip1.onrender.com/user/addfriend", {
        _id,
        friend_email: email,
      });
      if (res) setupdate(!update);
    }

    setEmail("");
  };
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [showDiv, setShowDiv] = useState(false);
  const [buttonImage, setButtonImage] = useState(add);

  const toggleInvite = () => {
    setShowDiv(!showDiv);
    setButtonImage(showDiv ? add : minus);
  };

  return (
    <>
      <div className="flex flex-wrap m-2 gap-5 xl:gap-7.5 ">
        <div
          onClick={toggleInvite}
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#5B39CF] py-4 px-10 text-center font-medium text-white hover:bg-[#8D80EE] lg:px-8 xl:px-10 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none dark:hover:bg-[#394452]"
        >
          <img src={buttonImage} className="h-5 w-5" alt="" />
          Add Friends
        </div>
        {showDiv && (
          <div>
            <h2 className="italic text-[#5B39CF]">
            
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex items-center">
                <input
                  type="email"
                  id="emailInput"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="friendsMail@gmail.com"
                  className="w-full h-8 rounded-lg p-2 bg-transparent	border"
                />
                <button
                  type="submit"
                  className="ml-2 h-8 rounded-lg bg-[#5B39CF] p-1 text-white hover:bg-blue"
                >
                  Invite!
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="flex gap-x-10px flex-wrap justify-items-center ">
        {contactList?.map((contact, index) => (
          <figure
            className="bg-white text-white m-3 p-2 min-w-[45%] rounded-lg shadow-md hover:scale-105 duration-200 ease-in-out transition  drop-shadow-1 dark:bg-[#394452] dark:drop-shadow-none dark:hover:bg-[#394452]"
            key={index}
          >
            <img
              alt="user"
              className="w-25 h-25 rounded-full mx-auto mt-7"
              src={contact.url}
            />
            <figcaption className="text-center mt-5">
              <p className="text-black font-semibold text-xl mb-2 dark:text-white">
                {contact.name}
              </p>
              <p className="text-black dark:text-white">
                <span className="font-medium">email: </span>
                {contact.email}
              </p>
              <p className="text-black dark:text-white">
                <span className="font-medium">phone: </span>
                {contact.mobile}
              </p>
              <p className="text-black dark:text-white">
                <span className="font-medium">city: </span>
                {contact.address}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
};
export default Friends;
