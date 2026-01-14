import React, { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addItemSchema } from "./AddItemSchema";
import { ImagePlus } from "lucide-react";


const AddItem = ({ menuItems = [] }) => {
  const categories = useMemo(
    () => [...new Set(menuItems.map((i) => i.category))],
    [menuItems]
  );

  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      isVeg: true,
      available: true,
      sizes: [],
      addons: [],
      allergens: [],
    },
  });

  const {
    fields: sizeFields,
    append: addSize,
    remove: removeSize,
  } = useFieldArray({ control, name: "sizes" });

  const {
    fields: addonFields,
    append: addAddon,
    remove: removeAddon,
  } = useFieldArray({ control, name: "addons" });

  const {
    fields: allergenFields,
    append: addAllergen,
    remove: removeAllergen,
  } = useFieldArray({ control, name: "allergens" });

  const selectedCategory = watch("category");
  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      setImagePreview(URL.createObjectURL(imageFile[0]));
    }
  }, [imageFile]);

  const onSubmit = (data) => {
    const finalCategory =
      data.category === "NEW" ? data.newCategory : data.category;

    const payload = {
      name: data.name,
      description: data.description,
      basePrice: data.price,
      foodType: data.isVeg ? "VEG" : "NON_VEG",
      category: finalCategory,
      image: data.image[0],

      sizes: data.sizes ?? [],
      addons: data.addons ?? [],
      allergens: data.allergens ?? [],
    };

    console.log("FINAL PAYLOAD:", payload);

    reset();
    setImagePreview(null);
  };

  const inputClass =
    "w-full rounded-xl bg-[#EFE8DD] px-4 py-3 text-sm text-[#3E3A36] placeholder:text-[#8C857D] border border-[#E5D9C8] focus:outline-none focus:ring-2 focus:ring-[#9C3F1F]/30";

  return (
    <div className="min-h-screen bg-[#FFF6E9] px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#FFF6E9] rounded-2xl p-6 space-y-6"
        >
          <h1 className="text-2xl font-bold text-[#3E3A36]">
            Add Menu Item
          </h1>

          <input {...register("name")} placeholder="Item name" className={inputClass} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}

          <div className="relative">
            <select {...register("category")} className={`${inputClass} appearance-none`}>
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="NEW">+ Add new category</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8C857D]">
              ▾
            </span>
          </div>

          {selectedCategory === "NEW" && (
            <input
              {...register("newCategory")}
              placeholder="New category name"
              className={inputClass}
            />
          )}

          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            placeholder="Price (£)"
            className={inputClass}
          />

          <textarea
            {...register("description")}
            rows={3}
            placeholder="Description (optional)"
            className={`${inputClass} resize-none`}
          />

          <div>
            <label className="block text-sm font-medium text-[#3E3A36] mb-2">
              Dish Image
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("image")}
              id="image-upload"
              className="hidden"
            />

            {!imagePreview ? (
              <label
                htmlFor="image-upload"
                className="
                  flex flex-col items-center justify-center
                  h-40 w-40 cursor-pointer
                  rounded-xl border-2 border-dashed border-[#E5D9C8]
                  bg-[#EFE8DD]
                  text-[#8C857D]
                  hover:bg-[#E6DCCF]
                  transition
                "
              >
                <ImagePlus size={32} className="mb-2" />
                <span className="text-sm font-medium">Add Image</span>
                <span className="text-xs mt-1">PNG, JPG up to 5MB</span>
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="h-40 w-40 object-cover rounded-xl"
                />

                <label
                  htmlFor="image-upload"
                  className="
                    absolute bottom-2 left-2
                    bg-black/70 text-white text-xs
                    px-3 py-1 rounded-lg
                    cursor-pointer
                    hover:bg-black
                  "
                >
                  Change
                </label>
              </div>
            )}

            {errors.image && (
              <p className="text-xs text-red-500 mt-1">
                {errors.image.message}
              </p>
            )}
          </div>


          <div className="flex gap-6 text-sm text-[#3E3A36]">
            <label><input type="checkbox" {...register("isVeg")} /> Veg</label>
            <label><input type="checkbox" {...register("available")} /> Available</label>
          </div>

          <div>
            <h3 className="font-semibold">Sizes (optional)</h3>

            {sizeFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mt-2">
                <input
                  {...register(`sizes.${index}.name`)}
                  placeholder="Size name"
                  className={inputClass}
                />
                <input
                  type="number"
                  {...register(`sizes.${index}.price`, { valueAsNumber: true })}
                  placeholder="Price"
                  className={inputClass}
                />
                <button type="button" onClick={() => removeSize(index)}>✕</button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addSize({ name: "", price: 0 })}
              className="text-sm mt-2 text-[#9C3F1F]"
            >
              + Add Size
            </button>
          </div>

          <div>
            <h3 className="font-semibold">Addons (optional)</h3>

            {addonFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mt-2">
                <input
                  {...register(`addons.${index}.name`)}
                  placeholder="Addon name"
                  className={inputClass}
                />
                <input
                  type="number"
                  {...register(`addons.${index}.price`, { valueAsNumber: true })}
                  placeholder="Price"
                  className={inputClass}
                />
                <button type="button" onClick={() => removeAddon(index)}>✕</button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addAddon({ name: "", price: 0 })}
              className="text-sm mt-2 text-[#9C3F1F]"
            >
              + Add Addon
            </button>
          </div>

          <div>
            <h3 className="font-semibold">Allergens (optional)</h3>

            {allergenFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mt-2">
                <input
                  {...register(`allergens.${index}.name`)}
                  placeholder="Allergen (e.g. Milk and products derived therefrom)"
                  className={inputClass}
                />
                <button type="button" onClick={() => removeAllergen(index)}>✕</button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addAllergen({ name: "" })}
              className="text-sm mt-2 text-[#9C3F1F]"
            >
              + Add Allergen
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#9C3F1F] py-3 text-white font-semibold hover:bg-[#8A3518]"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
