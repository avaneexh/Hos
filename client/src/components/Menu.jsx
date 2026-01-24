import React, { useEffect, useRef, useState } from "react";
import MenuSidebar from "./MenuSidebar";
import {
  Drumstick,
  Leaf,
  Loader,
  Utensils as MenuIcon,
  X,
  Trash2,
} from "lucide-react";
import { useMenuStore } from "../store/useMenuStore";
import DishCustomizer from "./DishCustomizer";
import { useCartStore } from "../store/useCartStore";

const Menu = () => {
  const { menu, getMenu, isLoading } = useMenuStore();

  const items = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addToCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  console.log("items", items);
  
  const [activeCategory, setActiveCategory] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openDish, setOpenDish] = useState(null);

  const sectionRefs = useRef({});
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    getMenu();
  }, [getMenu]);

  useEffect(() => {
    if (menu.length > 0 && !activeCategory) {
      setActiveCategory(menu[0].category);
    }
  }, [menu, activeCategory]);

  const handleCategoryClick = (category) => {
    sectionRefs.current[category]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (!menu.length) return;

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
  }, [menu]);

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [openMobileMenu]);

  const getSimpleCartItem = (dishId) => {
    return items.find(
      (i) =>
        i.dishId === dishId &&
        !i.size &&
        (!i.addons || i.addons.length === 0)
    );
  };

  if (isLoading) {
    return (
      <div className="flex mt-4 justify-center h-screen bg-[#faf6ef]">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (!menu.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf6ef]">
        <p className="text-sm text-gray-500">No menu available</p>
      </div>
    );
  }

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
              {section.items.map((item) => {
                const cartItem = getSimpleCartItem(item.id);
                const isCustomizable =
                  item.sizes?.length || item.addons?.length;

                return (
                  <div
                    key={item.id}
                    className="border-b border-[#e5ddd1] pb-4"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 shrink-0 rounded-md overflow-hidden">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover block"
                          />
                        )}
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
                          £{item.price}
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <div>
                          {item.isVeg ? (
                            <Leaf
                              size={18}
                              className="text-green-600"
                            />
                          ) : (
                            <Drumstick
                              size={18}
                              className="text-red-600"
                            />
                          )}
                        </div>

                        {isCustomizable ? (
                          <button
                            onClick={() => setOpenDish(item)}
                            className="mt-2 px-4 py-1.5 text-sm font-semibold
                              border border-[#b23a2f] text-[#b23a2f]
                              rounded-lg hover:bg-[#b23a2f]/10"
                          >
                            ADD +
                          </button>
                        ) : cartItem ? (
                          <div className="flex items-center gap-2 border border-[#b23a2f] rounded-lg overflow-hidden">
                            {/* TRASH when qty === 1 */}
                            {cartItem.quantity === 1 ? (
                              <button
                                onClick={() =>
                                  updateQuantity(cartItem.id, 0)
                                }
                                className="px-3 py-1 text-[#b23a2f] hover:bg-[#b23a2f]/10"
                                title="Remove"
                              >
                                <Trash2 size={16} />
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    cartItem.id,
                                    cartItem.quantity - 1
                                  )
                                }
                                className="px-3 py-1 text-[#b23a2f]"
                              >
                                -
                              </button>
                            )}

                            <span className="px-2 text-sm font-semibold">
                              {cartItem.quantity}
                            </span>

                            <button
                              onClick={() =>
                                addToCart({
                                  dishId: item.id,
                                  name: item.name,
                                  image: item.image,
                                  isVeg: item.isVeg,
                                  size: null,
                                  addons: [],
                                  quantity: 1,
                                  unitPrice: item.price,
                                  totalPrice: item.price,
                                })
                              }
                              className="px-3 py-1 text-[#b23a2f]"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() =>
                              addToCart({
                                dishId: item.id,
                                name: item.name,
                                image: item.image,
                                isVeg: item.isVeg,
                                size: null,
                                addons: [],
                                quantity: 1,
                                unitPrice: item.price,
                                totalPrice: item.price,
                              })
                            }
                            className="mt-2 px-4 py-1.5 text-sm font-semibold
                              border border-[#b23a2f] text-[#b23a2f]
                              rounded-lg hover:bg-[#b23a2f]/10"
                          >
                            ADD +
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      <button
        onClick={() => setOpenMobileMenu((prev) => !prev)}
        className={`lg:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2
          px-5 py-3 rounded-full shadow-lg transition-all
          ${
            openMobileMenu
              ? "bg-[#2f2f2f] text-white"
              : "bg-[#4a2c2a] text-[#f7f1e7]"
          }
        `}
      >
        {openMobileMenu ? <X size={18} /> : <MenuIcon size={18} />}
        <span className="text-sm font-medium">
          {openMobileMenu ? "Close" : "Menu"}
        </span>
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
                  className={`flex justify-between px-5 py-3 text-sm font-medium cursor-pointer
                    ${
                      activeCategory === m.category
                        ? "text-[#b23a2f]"
                        : "text-gray-700"
                    }
                  `}
                >
                  <span>{m.category}</span>
                  <span className="text-gray-400 text-xs">
                    {m.items.length}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <DishCustomizer
        dish={openDish}
        open={!!openDish}
        onClose={() => setOpenDish(null)}
      />
    </div>
  );
};

export default Menu;
