import React, { useEffect, useRef, useState, useMemo } from "react";
import MenuSidebar from "./MenuSidebar";
import { Drumstick, Leaf, Loader, Trash2 } from "lucide-react";
import { useMenuStore } from "../store/useMenuStore";
import DishCustomizer from "./DishCustomizer";
import { useCartStore } from "../store/useCartStore";
import GoToTopBtn from "./GoToTopBtn";
import FloatingCartBtn from "./FloatingCartBtn";
import { useNavigate } from "react-router-dom";
import RepeatCustomizationPopup from "./RepeatCustomizationPopup";

const Menu = () => {
  const { menu, getMenu, isLoading } = useMenuStore();
  const navigate = useNavigate();

  const items = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addToCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const cartMap = useMemo(() => {
    const map = {};

    items.forEach((c) => {
      const key = String(c.dishId);

      if (!map[key]) {
        map[key] = {
          totalQty: 0,
          lastItem: c,
          items: [],
        };
      }

      map[key].totalQty += c.quantity;
      map[key].items.push(c);
      map[key].lastItem =
        map[key].items[map[key].items.length - 1];
    });

    return map;
  }, [items]);

  const [activeCategory, setActiveCategory] = useState(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openDish, setOpenDish] = useState(null);
  const [repeatDish, setRepeatDish] = useState(null);
  const [repeatCustomizations, setRepeatCustomizations] = useState([]);

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
            ref={(el) =>
              (sectionRefs.current[section.category] = el)
            }
            data-category={section.category}
          >
            <h2 className="text-lg font-semibold mb-4">
              {section.category}
            </h2>

            <div className="space-y-4">
              {section.items.map((item) => {
                const cartGroup = cartMap[String(item.id)];
                const totalQty = cartGroup?.totalQty || 0;
                const lastItem = cartGroup?.lastItem;
                const customizations = cartGroup?.items || [];

                const hasSizes =
                  Array.isArray(item?.sizes) &&
                  item.sizes.length > 0;
                const hasAddons =
                  Array.isArray(item?.addons) &&
                  item.addons.length > 0;
                const isCustomizable =
                  hasSizes || hasAddons;

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

                        {totalQty > 0 ? (
                          <div className="flex items-center border border-[#b23a2f] rounded-lg overflow-hidden">
                            {customizations.length > 1 ? (
                              <button
                                onClick={() => {
                                  setRepeatDish(item);
                                  setRepeatCustomizations(
                                    customizations
                                  );
                                }}
                                className="px-3 py-1 text-[#b23a2f]"
                              >
                                -
                              </button>
                            ) : lastItem?.quantity > 1 ? (
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    lastItem.cartItemId,
                                    lastItem.quantity - 1
                                  )
                                }
                                className="px-3 py-1 text-[#b23a2f]"
                              >
                                -
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    lastItem.cartItemId,
                                    0
                                  )
                                }
                                className="px-3 py-1 text-[#b23a2f]"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}

                            <span className="px-2 text-sm font-semibold">
                              {totalQty}
                            </span>

                            <button
                              onClick={() => {
                                if (
                                  isCustomizable &&
                                  customizations.length > 0
                                ) {
                                  setRepeatDish(item);
                                  setRepeatCustomizations(
                                    customizations
                                  );
                                } else if (isCustomizable) {
                                  setOpenDish(item);
                                } else {
                                  addToCart({
                                    dishId: item.id,
                                    name: item.name,
                                    image: item.image,
                                    isVeg: item.isVeg,
                                    size: null,
                                    addons: [],
                                    quantity: 1,
                                  });
                                }
                              }}
                              className="px-3 py-1 text-[#b23a2f]"
                            >
                              +
                            </button>
                          </div>
                        ) : isCustomizable ? (
                          <button
                            onClick={() =>
                              setOpenDish(item)
                            }
                            className="mt-2 px-4 py-1.5 text-sm font-semibold
                            border border-[#b23a2f] text-[#b23a2f]
                            rounded-lg hover:bg-[#b23a2f]/10"
                          >
                            ADD +
                          </button>
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

      <DishCustomizer
        dish={openDish}
        open={!!openDish}
        onClose={() => setOpenDish(null)}
      />

      <RepeatCustomizationPopup
        open={!!repeatDish}
        dish={repeatDish}
        customizations={repeatCustomizations}
        onClose={() => setRepeatDish(null)}
        onAddNew={() => {
          setOpenDish(repeatDish);
          setRepeatDish(null);
        }}
      />

      {!openDish && !repeatDish &&  <GoToTopBtn />}
      {!openDish && !repeatDish &&  (
        <FloatingCartBtn
          onClick={() => navigate("/cart")}
        />
      )}
    </div>
  );
};

export default Menu;