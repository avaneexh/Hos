const MenuSidebar = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <aside className="w-64 bg-[#f7f1e7] border-r border-[#e5ddd1] h-screen sticky top-0 overflow-y-auto">
      <ul className="py-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;

          return (
            <li
              key={cat}
              onClick={() => onCategoryClick(cat)}
              className={`cursor-pointer px-6 py-3 text-sm font-medium transition-all
                ${
                  isActive
                    ? "border-l-4 border-[#b23a2f] bg-[#f1e6d8] text-[#b23a2f]"
                    : "border-l-4 border-transparent text-gray-700 hover:bg-[#efe4d6]"
                }
              `}
            >
              {cat}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default MenuSidebar;
