import { useEffect, useState } from "react";

function Header() {
  const [activeTab, setActiveTab] = useState<string>("main");

  useEffect(() => {
    const handleScroll = () => {
      // set active tab
      const sections = document.querySelectorAll("section");

      let currentSection = "main";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section.id;
        }
      });

      setActiveTab(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-10 sm:hidden">
      <nav className="m-0 p-2 text-xl font-bold flex justify-between items-center text-gray-100 bg-gradient-to-b from-red-50 to-red-600 shadow-lg">
        <a
          href="#main"
          className={`cursor-pointer flex items-center gap-1 ${
            activeTab === "main" ? "text-black" : ""
          }`}
        >
          <img
            src="./images/logo.png"
            alt="logo"
            className="w-8 inline-block"
          ></img>
          Home
        </a>
        <div className="flex">
          <a
            href="#menu"
            className={`cursor-pointer ${
              activeTab === "menu" ? "text-black" : ""
            }`}
          >
            Menu
          </a>
          <a
            href="#cart"
            className={`ml-6 cursor-pointer ${
              activeTab === "cart" ? "text-black" : ""
            }`}
          >
            Cart
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
