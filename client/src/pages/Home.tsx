import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"
import { NavLink } from "react-router-dom"


export const Home = () => {
    return (
        <>
            <div className="w-max max-w-screen flex flex-col gap-8 text-amber-950 items-start pt-20 pl-10 lg:pl-0 pr-0 lg:pr-40 overflow-hidden">
                <div className=" dm-serif-text-home-title flex-wrap">
                    <h1>Smart Meals</h1>
                    <h1>Effortless Cooking</h1>
                </div>
                <div className="montserrat-home flex flex-col gap-3">
                    <p>Track ingredients with ease</p>
                    <p>Find recipes from what you have</p>
                    <p>Shop smarter, waste less</p>
                </div>
                <div className="montserrat-home">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <div>
                            <NavLink
                                to="recipes"
                                className="montserrat-home">
                                <Button type="button">Start My Plan</Button>
                            </NavLink>
                        </div>

                    </SignedIn>
                </div>
            </div>

            <img src="https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="home-page" className="w-screen h-full object-cover top-[74px] left-0 fixed z-[-10]" />
        </>
    )
}

