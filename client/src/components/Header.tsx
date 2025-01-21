import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { NavLink } from "react-router-dom"

export const Header = () => {
    return (
        <header className='border-current border-1 flex gap-8 p-5 items-center bg-green-600' >
            <div className='logo-container font-bold text-xl'>
                <NavLink to="/"><h3>Frigefy</h3></NavLink>
            </div>
            <div className=" flex justify-between w-full">
                <ul className="flex gap-8 font-bold">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `${isActive ? "text-black" : "text-white"}`}>
                        <p>Home</p>
                    </NavLink>
                    <NavLink
                        to="recipes"
                        className={({ isActive }) => `${isActive ? "text-black" : "text-white"}`}>
                        <p>Recipes</p>
                    </NavLink>
                    <NavLink
                        to="shoppinglist"
                        className={({ isActive }) => `${isActive ? "text-black" : "text-white"}`}>
                        <p>Shopping List</p>
                    </NavLink>
                </ul>

                <div>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>


            </div>
        </header >
    )
}
