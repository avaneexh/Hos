import { ChevronUp } from "lucide-react";
import { useCartStore } from "../store/useCartStore";
import { useEffect, useState } from "react";

const GoToTopBtn = () => {
  const [show, setShow] = useState(false);

  const hasCartItems = useCartStore((s) => s.items.length > 0);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      className={`
        fixed
        right-4
        z-50
        w-10 h-10
        flex items-center justify-center
        rounded-full
        bg-[#2f2f2f]
        text-white
        shadow-lg
        transition-all
        duration-300
        ${
          hasCartItems
            ? "bottom-20"   
            : "bottom-4"  
        }
      `}
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default GoToTopBtn;
