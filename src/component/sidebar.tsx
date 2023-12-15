import React, { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import Link from 'next/link';

const SidebarBuyer = () => {
  const [open, setOpen] = useState(true);
  const router = useRouter()

  const sideLink = [
    {
      to: '/dashboard',
      icon: <Icon icon ="ant-design:dashboard-outlined"/>,
      name: 'Dashboard',
    },
  ];

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('id');
    toast.success('Successfully Logout');
    router.push('/login-admin');
  };
  return (
    <div className="h-full bg-white w-16">
      <div className="p-5 pt-8 relative flex flex-col h-full duration-300">
        
        <div className="flex flex-col my-20 space-y-2">
          {sideLink.map((element, index) => (
            <Link key={index} href={element.to}>
              <div
                className={`flex rounded-md p-2 mb-3 cursor-pointer hover:bg-slate-500 active:bg-slate-700 text-black text-lg items-center font-semibold gap-x-4 
                 ${router.pathname === element.to ? 'bg-slate-700' : ''}`}
              >
                <span>{element.icon}</span>
                <h1 className={`${!open && 'hidden'} origin-left duration-200`}>
                  {element.name}
                </h1>
              </div>
            </Link>
          ))}
          <div
            className="flex rounded-md p-2 mb-3 cursor-pointer text-black mx-10 text-lg items-center font-semibold"
            onClick={() => handleLogout()}
          >
            <span>{<BiLogOut />}</span>
            <h1 className={`${!open && 'hidden'} origin-left duration-200 cursor-pointer`}>
              Logout
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarBuyer;