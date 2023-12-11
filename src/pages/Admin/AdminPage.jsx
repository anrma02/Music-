import PropTypes from "prop-types";
import React from "react";

import Image from "~/assest/image";
import { LogoIcon } from "~/components/Icon";
import "./AdminPage.scss";
import { Link } from "react-router-dom";
import UserList from "~/components/Admin/UserList";
import AdminTrack from "~/components/Admin/AdminTrack";
import AdminArtist from "~/components/Admin/AdminArtist";
import AdminAlbum from "~/components/Admin/AdminAlbum";


const tab = [
     { id: 1, label: "Users", value: "users" },
     { id: 2, label: "Track", value: "track" },
     { id: 3, label: "Album", value: "album" },
     { id: 4, label: "Artist", value: "artist" },
     // { id: 5, label: "Playlist", value: "playlist" },

]

function Tabs({ tabs, activeTab, onChange, className }) {


     return < >
          {tabs?.map((tab, index) => (
               <button
                    key={index}

                    className={`tab ${activeTab === index ? 'active' : ''} ${className}`}
                    onClick={() => {
                         onChange(index);
                    }}
               >
                    {tab.label}
               </button >
          ))
          }
     </>

}

function AdminPage() {
     const [activeTab, setActiveTab] = React.useState(0);


     return (
          <div className="bg-[#1d1c1c] h-[100vh] ">
               <header className="bg-[#000] mb-3 flex items-center justify-between h-full py-[25px] px-[30px] max-h-[100px]">
                    <Link to={'/'} >   <LogoIcon className="w-12 h-12 text-[#fff]" /></Link>
                    <div>
                         <Image className=" h-[40px] w-[40px] rounded-full " />
                    </div>
               </header>

               <main className="bg-[#000000] h-full max-h-[635px] " >
                    <div className=" p-[20px] grid grid-rows-1 grid-flow-col  max-w-[500px]   ">
                         <Tabs tabs={tab}

                              activeTab={activeTab}
                              onChange={(index) => {
                                   setActiveTab(index);
                              }}
                         />
                    </div>
                    {
                         activeTab === 0 && <UserList />

                    }
                    {
                         activeTab === 1 && <AdminTrack />
                    }
                    {activeTab === 2 && <AdminAlbum />
                    }

                    {activeTab === 3 && <AdminArtist />
                    }

               </main>

          </div>
     );
}

Tabs.propTypes = {
     tabs: PropTypes.arrayOf(
          PropTypes.shape({
               label: PropTypes.string.isRequired,
               // Define other properties of each tab object here
          }),
     ).isRequired,
     onChange: PropTypes.func.isRequired,
     activeTab: PropTypes.number.isRequired,
     className: PropTypes.string,

}


export default AdminPage;
