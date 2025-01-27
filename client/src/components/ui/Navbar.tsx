import { NavLink } from "react-router-dom"

type Props = {
    isScreen: boolean
    isToggle: () => void
}

export const Navbar = ({ isToggle }: Props) => {

    return (
        <ul className="flex flex-col gap-8 font-bold bg-[#8FBC8B] p-5 w-screen md:w-full md:bg-transparent md:flex-row md:p-0 md:justify-end" >
            <NavLink
                onClick={isToggle}
                to="/"
                className={({ isActive }) => `${isActive ? "text-green-600" : "text-white "}`}>
                <p>Home</p>
            </NavLink>
            <NavLink
                to="/recipes"
                onClick={isToggle}
                className={({ isActive }) => `${isActive ? "text-green-600" : "text-white "}`}>
                <p>Recipes</p>
            </NavLink>
            <NavLink
                to="/shoppinglist"
                onClick={isToggle}
                className={({ isActive }) => `${isActive ? "text-green-600" : "text-white"}`}>
                <p>Shopping List</p>
            </NavLink>
        </ul>
    )
}
