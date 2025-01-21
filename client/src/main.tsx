import { ClerkProvider } from '@clerk/clerk-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import RootLayout from './layouts/Rootlayout.tsx'
import { Home } from './pages/Home.tsx'
import { Recipes } from './pages/Recipes.tsx'
import { ShoppingList } from './pages/ShoppingList.tsx'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "recipes",
        element: <Recipes />,
      },
      {
        path: "shoppinglist",
        element: <ShoppingList />,
      }
    ]
  },
  {
    path: "*",
    element: <h2>Page Not Found :/</h2>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
