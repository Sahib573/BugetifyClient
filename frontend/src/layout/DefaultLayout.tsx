import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet ,useNavigate} from "react-router-dom";


const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const getUser = localStorage.getItem("user");
  let usr = "";
  if (getUser) {
     usr = JSON.parse(getUser);
  }else{
    navigate("/auth/signin")
  }
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* main area   */}
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/*  Header Start  */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/*  Main Content Start */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {/* the<Outlet> element will render element depending on the current location. */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
