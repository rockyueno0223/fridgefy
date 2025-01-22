import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "../ui/Navbar";


export const Header = () => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [isScreen, setisScreen] = useState<boolean>(true);
    const [style, setStyle] = useState<string>("hamberger-menu hidden absolute top-[74px]")
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const handleToggleMenu = () => {
        if (style !== "hamberger-menu shown absolute top-[74px]") {
            setStyle(_prev => "hamberger-menu shown absolute top-[74px]")
            setIsOpen(_prev => true)
        } else {
            setStyle(_prev => "hamberger-menu hidden top-[74px]")
            setIsOpen(_prev => false)
        }
    }


    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(_prev => window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        if (screenWidth > 768) {
            setisScreen(true)
        } else {
            setisScreen(false)
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [screenWidth]);




    return (
        <header className="flex flex-col sticky top-0 left-0">
            <div className='border-current border-1 flex gap-8 p-5 items-center bg-green-500 z-10'>

                <div className='logo-container font-bold text-xl'>
                    <NavLink to="/"><h3>Frigefy</h3></NavLink>
                </div>

                <div className=" flex flex-row-reverse justify-start w-full items-center gap-8 md:flex-row md:justify-end ">
                    {isScreen ? <Navbar isScreen={isScreen} isToggle={handleToggleMenu} /> :
                        <button type="button" className="text-white" onClick={handleToggleMenu} >{isOpen ? <X /> : <Menu />}</button>
                    }
                    <div>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <div className="pt-2">
                                <UserButton />
                            </div>
                        </SignedIn>
                    </div>
                </div>
            </div>

            {isScreen ? null :
                <div className={style} ><Navbar isScreen={isScreen} isToggle={handleToggleMenu} /></div>
            }

        </header >
    )
}
