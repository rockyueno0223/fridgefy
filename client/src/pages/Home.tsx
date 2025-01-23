import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"
import { NavLink } from "react-router-dom"


export const Home = () => {
    return (
        <div className="w-screen button-0 left-0 z-[-10] relative" >
            <img src="https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="home-page" className="w-screen h-[calc(100vh-74px)] object-cover" />
            <div className="absolute top-20 left-20 flex flex-col gap-5 text-amber-950">
                <div className=" dm-serif-text-home-title">
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
                        <NavLink
                            to="recipes"
                            className="montserrat-home">
                            <Button type="button">Start My Plan</Button>
                        </NavLink>
                    </SignedIn>
                </div>


            </div>

        </div>
    )
}

