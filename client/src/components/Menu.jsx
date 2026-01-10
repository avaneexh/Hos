import React, { useEffect, useRef, useState } from "react";
import MenuSidebar from "./MenuSidebar";
import { menu } from "./menuData";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(menu[0].category);
  const sectionRefs = useRef({});

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

  return (
    <div className="flex">
      <MenuSidebar
        categories={menu.map((m) => m.category)}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />

      <main className="flex-1 bg-[#faf6ef] px-8 py-6 space-y-12">
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
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="font-medium text-[#b23a2f]">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Menu;
