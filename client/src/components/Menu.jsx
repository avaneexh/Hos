import React, { useEffect, useRef, useState } from "react";
import MenuSidebar from "./MenuSidebar";
import { menu } from "./menuData";
import { Drumstick, Leaf, Utensils as MenuIcon, X } from "lucide-react";



const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(menu[0].category);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const sectionRefs = useRef({});
  const mobileMenuRef = useRef(null);

  const handleCategoryClick = (category) => {
    sectionRefs.current[category]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.dataset.category);
          }
        });
      },
      {
        rootMargin: "-100px 0px -70% 0px",
        threshold: 0,
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        openMobileMenu &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setOpenMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMobileMenu]);


  return (
    <div className="flex">
      <MenuSidebar
        categories={menu.map((m) => m.category)}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />

      <main className="flex-1 bg-[#faf6ef] px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        {menu.map((section) => (
          <section
            key={section.category}
            ref={(el) => (sectionRefs.current[section.category] = el)}
            data-category={section.category}
          >
            <h2 className="text-lg font-semibold mb-4">
              {section.category}
            </h2>

            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-[#e5ddd1] pb-4"
                >
                  <div className="flex gap-4">

                    <div className="w-20 h-20 shrink-0 rounded-lg bg-transparent overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          className="w-full h-full object-cover block"
                        />
                      ) : null}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-[#3E3A36]">
                        {item.name}
                      </h3>

                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      <div className="mt-2 font-medium text-[#b23a2f]">
                        {item.price}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">

                      <div className="flex items-center justify-end">
                        {item.isVeg ? (
                          <Leaf size={18} className="text-green-600" />
                        ) : (
                          <Drumstick size={18} className="text-red-600" />
                        )}
                      </div>


                      <button
                        className="mt-2 px-4 py-1.5 text-sm font-semibold
                                  border border-[#b23a2f] text-[#b23a2f]
                                  rounded-lg hover:bg-[#b23a2f]/10
                                  transition"
                      >
                        ADD +
                      </button>
                    </div>
                  </div>
                </div>

              ))}
            </div>
          </section>
        ))}
      </main>
      <button
        onClick={() => setOpenMobileMenu((prev) => !prev)}
        className={`lg:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2
          px-5 py-3 rounded-full shadow-lg
          active:scale-95 transition-all
          ${
            openMobileMenu
              ? "bg-[#2f2f2f] text-white"
              : "bg-[#4a2c2a] text-[#f7f1e7]"
          }
        `}
      >
        {openMobileMenu ? (
          <>
            <X size={18} strokeWidth={2} />
            <span className="text-sm font-medium">Close</span>
          </>
        ) : (
          <>
            <MenuIcon size={18} strokeWidth={2} />
            <span className="text-sm font-medium">Menu</span>
          </>
        )}
      </button>



      {openMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
          
          <div
            ref={mobileMenuRef}
            className="mb-20 w-[90%] max-w-sm bg-white rounded-2xl shadow-2xl"
          >
            <ul className="py-3">
              {menu.map((m) => (
                <li
                  key={m.category}
                  onClick={() => {
                    handleCategoryClick(m.category);
                    setOpenMobileMenu(false);
                  }}
                  className={`flex justify-between items-center px-5 py-3 text-sm font-medium cursor-pointer
                    ${
                      activeCategory === m.category
                        ? "text-[#b23a2f]"
                        : "text-gray-700"
                    }
                  `}
                >
                  <span>{m.category}</span>

                  <span className="text-gray-400 text-xs">
                    {m.items?.length ?? ""}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      )}

    </div>
  );
};

export default Menu;
