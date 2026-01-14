import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addItemSchema } from "./AddItemSchema";

const AddItem = ({ menuItems = [] }) => {
  const categories = useMemo(
    () => [...new Set(menuItems.map((i) => i.category))],
    [menuItems]
  );

  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      isVeg: true,
      available: true,
    },
  });

  const selectedCategory = watch("category");
  const imageFile = watch("image");

  const name = watch("name");
  const price = watch("price");
  const description = watch("description");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      setImagePreview(URL.createObjectURL(imageFile[0]));
    }
  }, [imageFile]);

  const onSubmit = (data) => {
    const finalCategory =
      data.category === "NEW" ? data.newCategory : data.category;

    const payload = {
      ...data,
      category: finalCategory,
      image: data.image[0],
    };

    console.log("FINAL PAYLOAD:", payload);
    reset();
    setImagePreview(null);
  };

  const inputClass =
    "w-full rounded-xl bg-[#EFE8DD] px-4 py-3 text-sm text-[#3E3A36] placeholder:text-[#8C857D] border border-[#E5D9C8] focus:outline-none focus:ring-2 focus:ring-[#9C3F1F]/30";

  return (
    <div className="min-h-screen bg-[#FFF6E9] px-4 py-10">
      <div className="max-w-6xl mx-auto grid  gap-8">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#FFF6E9] rounded-2xl p-6 space-y-5"
        >
          <h1 className="text-2xl font-bold text-[#3E3A36]">
            Add Menu Item
          </h1>

          <div>
            <input
              {...register("name")}
              placeholder="Item name"
              className={inputClass}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="relative">
            <select
              {...register("category")}
              className={`${inputClass} appearance-none`}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="NEW">+ Add new category</option>
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8C857D]">
              ▾
            </span>

            {errors.category && (
              <p className="text-xs text-red-500 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {selectedCategory === "NEW" && (
            <input
              {...register("newCategory", { required: true })}
              placeholder="New category name"
              className={inputClass}
            />
          )}

          <div>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              placeholder="Price (£)"
              className={inputClass}
            />
            {errors.price && (
              <p className="text-xs text-red-500 mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <textarea
            {...register("description")}
            rows={3}
            placeholder="Description (optional)"
            className={`${inputClass} resize-none`}
          />

          <div>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="text-sm"
            />
            {errors.image && (
              <p className="text-xs text-red-500 mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="flex gap-6 text-sm text-[#3E3A36]">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("isVeg")} />
              Veg
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" {...register("available")} />
              Available
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#9C3F1F] py-3 text-sm font-semibold text-white hover:bg-[#8A3518] transition-colors"
          >
            Add Item
          </button>
        </form>

      </div>
    </div>
  );
};

export default AddItem;
