
import React from "react";
import { MenuItem as MenuItemType } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg menu-item">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
          <span className="font-bold text-menuOrange">
            {`R$ ${item.price.toFixed(2)}`}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 h-10">
          {item.description}
        </p>
        <Button 
          className="w-full bg-menuOrange hover:bg-menuOrange/90 text-white"
          onClick={() => addToCart(item)}
        >
          <Plus className="h-4 w-4 mr-2" /> Adicionar
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
