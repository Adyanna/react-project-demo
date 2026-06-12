import './App.css'
import { Outlet } from 'react-router';
import { Layout } from '@core/components/layout/layout';
import type { Menu_Options } from '@core/types/core-types'
import { useState } from 'react';

const MenuOptions :Menu_Options[] = [
  { label: "Home", path: "/home" },
  { label: "Products", path: "/products" },
  { label: "CrearProducto", path: "/products/new" }
]
 
const srclogo = "../src/assets/logo.avif";


function App() {
  const token = localStorage.getItem("token")
  console.log("TOKEN DESDE APP: ",token);
  const [isautenticate,setIsAutenticate]=useState(!!token);

  return (
    <>
    <Layout
      title="MPRACTICE"
      subTittle="Welcome to my app"
      menuOptions={MenuOptions}
      srcl={srclogo}
      isAuth={isautenticate}
      setIsAuth={setIsAutenticate}
    >
      <Outlet/>
    </Layout>
    </>
  )
}

export default App
