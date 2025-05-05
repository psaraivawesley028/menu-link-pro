
import React from "react";
import { Category } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MenuCategoriesProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (categoryId: string) => void;
}

const MenuCategories: React.FC<MenuCategoriesProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-6">
      <ScrollArea className="w-full">
        <div className="flex p-2 space-x-2 w-max">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all menu-transition ${
                activeCategory === category.id
                  ? "bg-menuOrange text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MenuCategories;
