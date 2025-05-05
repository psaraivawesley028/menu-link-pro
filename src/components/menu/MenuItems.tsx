
import React from "react";
import { MenuItem as MenuItemType } from "@/types";
import MenuItem from "./MenuItem";

interface MenuItemsProps {
  items: MenuItemType[];
  categoryId: string;
}

const MenuItems: React.FC<MenuItemsProps> = ({ items, categoryId }) => {
  const filteredItems = categoryId
    ? items.filter((item) => item.category === categoryId)
    : items;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuItems;
