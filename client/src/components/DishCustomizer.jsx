import React, { useEffect, useMemo, useState } from "react";
import {
  X,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Leaf,
  Drumstick,
} from "lucide-react";

const DishCustomizer = ({ dish, open, onClose, onAdd }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [showAllergens, setShowAllergens] = useState(false);
  const [showDescription, setShowDescription] = useState(false);


  useEffect(() => {
    if (!open) {
      setSelectedSize(null);
      setSelectedAddons([]);
      setQuantity(1);
      setNote("");
      setShowAllergens(false);
      setShowDescription(false);
    }
  }, [open]);

  useEffect(() => {
    const original = document.body.style.overflow;

    if (open) {
        document.body.style.overflow = "hidden";
    }

    return () => {
        document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    if (dish?.sizes?.length > 0) {
        setSelectedSize(dish.sizes[0]);
    } else {
        setSelectedSize(null);
    }
  }, [dish]);


  const basePrice = selectedSize?.price ?? dish?.price ?? 0;

  const totalPrice = useMemo(() => {
    const addonsTotal = selectedAddons.reduce(
      (sum, a) => sum + a.price,
      0
    );
    return (basePrice + addonsTotal) * quantity;
  }, [basePrice, selectedAddons, quantity]);

  if (!open || !dish) return null;

  return (
    <div className="fixed inset-0  z-50 ">
      <div className="absolute inset-0 bg-black/40 overscroll-contain" onClick={onClose} />

      <div
        className="
          absolute bottom-0 w-full
          lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2
          lg:max-w-xl
          p-0.5
          bg-[#faf6ef]
          rounded-t-2xl lg:rounded-2xl
          flex flex-col
          lg:max-h-[90vh]
          lg:min-h-[60vh]
          text-[13px]
          max-h-[60vh]
          min-h-[60vh]
          overflow-hidden
        "
      >

        <div className="p-5 bg-[#FFF6E9] shrink-0 rounded-t-2xl">
        <div className="flex items-start gap-4">
            {dish.image && (
            <img
                src={dish.image}
                alt={dish.name}
                className="w-18 h-18 rounded-xl object-cover"
            />
            )}

            <div className="flex-1">
            <h3 className="font-semibold text-[#3E3A36] text-sm">
                {dish.name}
            </h3>

            <div className="flex items-center gap-2 mt-1">
                {dish.isVeg ? (
                <Leaf size={14} className="text-green-600" />
                ) : (
                <Drumstick size={14} className="text-red-600" />
                )}

                {dish.description && (
                <button
                    onClick={() => setShowDescription((p) => !p)}
                    className="flex items-center gap-1 text-xs text-[#8C857D]"
                >
                    Description
                    {showDescription ? (
                    <ChevronUp size={14} />
                    ) : (
                    <ChevronDown size={14} />
                    )}
                </button>
                )}
            </div>

            {showDescription && dish.description && (
                <div className="mt-2 text-xs text-gray-600 leading-relaxed">
                {dish.description}
                </div>
            )}
            </div>

            <button onClick={onClose} className="rounded-xl bg-black/5 p-2 hover:bg-black/10">
            <X size={18} />
            </button>
        </div>
        </div>


        <div className="flex-1 overflow-y-auto no-scrollbar px-5 space-y-4">
          {dish.sizes?.length > 0 && (
            <div className="p-4 rounded-xl bg-[#EFE8DD]">
              <h4 className="font-semibold text-[#3E3A36] mb-2">
                Choose Size
              </h4>

              <div className="space-y-2">
                {dish.sizes.map((s) => (
                  <label
                    key={s.id}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="size"
                        checked={selectedSize?.id === s.id}
                        onChange={() => setSelectedSize(s)}
                      />
                      <span>{s.name}</span>
                    </div>
                    <span className="font-medium">£{s.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {dish.addons?.length > 0 && (
            <div className="p-4 rounded-xl bg-[#F4EDE4]">
              <h4 className="font-semibold text-[#3E3A36] mb-2">
                Addons
              </h4>

              <div className="space-y-2">
                {dish.addons.map((a) => (
                  <label
                    key={a.id}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedAddons.some(
                          (x) => x.id === a.id
                        )}
                        onChange={() =>
                          setSelectedAddons((prev) =>
                            prev.some((x) => x.id === a.id)
                              ? prev.filter((x) => x.id !== a.id)
                              : [...prev, a]
                          )
                        }
                      />
                      <span>{a.name}</span>
                    </div>
                    <span className="font-medium">+£{a.price}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {dish.allergens?.length > 0 && (
            <div>
              <button
                onClick={() => setShowAllergens((p) => !p)}
                className="flex items-center gap-2 font-semibold text-[#3E3A36] mb-1"
              >
                Allergens
                {showAllergens ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </button>

              {showAllergens && (
                <div className="
                   w-full rounded-xl
                    bg-[#F4EDE4]
                    px-4 py-2
                    focus:outline-none
                    min-h-10
                    mb-2
                ">
                <ul className="mt-2 ml-4 list-disc text-gray-600">
                  {dish.allergens.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
                </div>
              )}
            </div>
          )}

          <div>
            <h4 className="font-semibold text-[#3E3A36] mb-1">
              Special request
            </h4>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Any special instructions?"
              className="
                w-full rounded-xl
                bg-[#F4EDE4]
                px-4 py-2
                focus:outline-none
                min-h-20
                mb-2
              "
            />
          </div>
        </div>

        <div className="shrink-0 px-5 py-4 flex justify-between items-center bg-[#FFF6E9]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-3 rounded-xl bg-[#EFE8DD]"
            >
              <Minus size={16} />
            </button>

            <span className="font-medium">{quantity}</span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-3 rounded-xl bg-[#EFE8DD]"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() =>
              onAdd({
                dishId: dish.id,
                name: dish.name,
                image: dish.image,
                isVeg: dish.isVeg,
                size: selectedSize,
                addons: selectedAddons,
                quantity,
                note,
                totalPrice,
              })
            }
            className="px-6 py-3 rounded-xl bg-[#b23a2f] text-white font-semibold"
          >
            Add £{(totalPrice ?? 0).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCustomizer;
