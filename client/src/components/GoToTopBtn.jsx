import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const GoToTopBtn = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // top se 200px niche jaate hi button show hoga
      setShow(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed
        bottom-6
        right-6
        z-50
        w-10 h-10
        flex items-center justify-center
        rounded-full
        bg-[#2f2f2f]
        text-white
        shadow-lg
        hover:bg-black
        hover:scale-110
        transition
      "
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default GoToTopBtn;
