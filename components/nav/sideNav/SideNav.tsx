'use client';

import {useEffect, useState, useRef} from 'react';

import { useMediaQuery } from "react-responsive";
import {motion} from 'framer-motion';
import { usePathname } from "next/navigation";


import { MenuItem } from "./MenuItem";
import {sideBarLinks} from "@/constants"
import { ArrowLeft } from 'lucide-react';

export const SideNav = () => {
  let isTableMid = useMediaQuery({query: "(max-width: 768px)"});
  const pathName = usePathname();
  const sideBarRef= useRef<any>();

  const [open, setOpen] = useState(isTableMid ? false : true);

  useEffect(()=>{
    if(isTableMid){
        setOpen(false)
    }else{
        setOpen(true)
    }
 }, [isTableMid]);

  //SideBar Animation
  const navAnimation =  isTableMid ? {
    open:{
        x: 0,
        width: "16rem",
        transition: {
            damping: 40,                        
        },
    },
    closed: {
        x: -250,
        width: 0,
        transition: {
          damping: 40,
          delay: 0.15,
        },
      },
 } :{
    open: {
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        width: "4rem",
        transition: {
          damping: 40,
        },
      },
    };

  return (
    <div>
      <div onClick={()=>setOpen(false)} className={`fixed inset-0 max-h-screen z-[999] bg-black/50
                      ${open ? 'block' : 'hidden'}
                      md:hidden
                    `}>
      </div>
      <motion.div
        ref={sideBarRef}
        variants={navAnimation}
        initial={{x: isTableMid ? -250 : 0}}
        animate={open ? 'open' : 'closed'}
        className='bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] overflow-hidden fixed h-screen md:relative'
      >
          <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
             <img src="https://img.icons8.com/color/512/firebase.png" width={45} alt=""/>
             <span className="text-xl whitespace-pre">Red Barn</span>
          </div>
          <div className="flex flex-col h-full">
            {sideBarLinks.map((link) => (
              <MenuItem key={link.url} icon={link.icon} href={link.url} label={link.label} selected />
            ))}   
          </div>
          <motion.div
                onClick={() => {setOpen(!open) }}
                animate={
                open
                    ? {
                        x: 0,
                        y: -200,
                        rotate: 0,
                    }
                    : {
                        x: -10,
                        y: -200,
                        rotate: 180,
                    }
                }
                transition={{ duration: 0 }}
                className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
                >
                <ArrowLeft size={25} />
            </motion.div>                
      </motion.div>
    </div>
    
  )
}

