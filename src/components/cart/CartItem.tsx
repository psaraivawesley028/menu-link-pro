
import React, { useState } from "react";
import { CartItem as CartItemType } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart, updateNotes } = useCart();
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className="bg-white rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-menuOrange font-medium">R$ {item.price.toFixed(2)}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeFromCart(item.id)}
          className="text-gray-500 hover:text-red-500"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-full"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowNotes(!showNotes)}
          className="text-sm"
        >
          {showNotes ? "Ocultar observações" : "Adicionar observações"}
        </Button>
      </div>

      {showNotes && (
        <div className="mt-3">
          <Textarea
            placeholder="Observações para este item..."
            className="min-h-[80px]"
            value={item.notes}
            onChange={(e) => updateNotes(item.id, e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default CartItem;
