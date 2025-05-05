
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface MobileCartButtonProps {
  onClick: () => void;
}

const MobileCartButton: React.FC<MobileCartButtonProps> = ({ onClick }) => {
  const { cartCount, cartTotal } = useCart();

  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <Button
        onClick={onClick}
        className="w-full py-6 bg-menuOrange hover:bg-menuOrange/90 text-white flex items-center justify-between"
      >
        <div className="flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2" />
          <span className="font-semibold">{cartCount} {cartCount === 1 ? 'item' : 'itens'}</span>
        </div>
        <span className="font-bold">R$ {cartTotal.toFixed(2)}</span>
      </Button>
    </div>
  );
};

export default MobileCartButton;
