import { Navbar } from "flowbite-react";
import 'flowbite';
import  { useState } from "react";




function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

  return (

    <div>
      <Navbar
        fluid={true}
        rounded={true}
      >
        <Navbar.Brand href="https://flowbite.com/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/navbars"
            active={true}
          >
            Home
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            About
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Services
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Pricing
          </Navbar.Link>
          <Navbar.Link href="/navbars">
            Contact
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <div
        className={`drawer fixed top-0 left-0 h-screen w-64 bg-white shadow-lg ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Nội dung drawer ở đây */}
        <p className="p-4 text-center">Drawer content goes here</p>
      </div>

      {/* Nút để mở drawer */}
      <button onClick={toggleDrawer} className="btn text-center aligns-center w-full">
        {isDrawerOpen ? "Close Drawer" : "Open Drawer"}
      </button>

      {/* Script */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.6/flowbite.min.js"></script>



      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.6/flowbite.min.js"></script>
    </div >

  )
}

export default App
