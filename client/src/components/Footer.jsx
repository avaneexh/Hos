import { ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#F7F1E8] border-t border-[#E6DCCF] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h4 className="text-[#B23A2F] font-semibold mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm text-[#3E3A36]">
              <li className="hover:text-[#8B5E3C] cursor-pointer">Order Now</li>
              <li className="hover:text-[#8B5E3C] cursor-pointer">Reviews</li>
              <li className="hover:text-[#8B5E3C] cursor-pointer">Contact Us</li>
              <li className="hover:text-[#8B5E3C] cursor-pointer">
                Allergy Information
              </li>
              <li className="hover:text-[#8B5E3C] cursor-pointer">Unsubscribe</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h4 className="text-[#B23A2F] font-semibold mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-[#3E3A36]">
              <li className="hover:text-[#8B5E3C] cursor-pointer">
                Terms and Conditions
              </li>
              <li className="hover:text-[#8B5E3C] cursor-pointer">
                Terms of Use
              </li>
              <li className="hover:text-[#8B5E3C] cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#6B625C]">
          <p>© {new Date().getFullYear()} The HOS Corner. All rights reserved.</p>
          <p>Crafted with ❤️ for good food</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
