
import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface CartSummaryProps {
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { cartItems, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md text-center">
        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">Seu carrinho está vazio</h3>
        <p className="text-gray-500 mb-4">Adicione itens para continuar</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Resumo do Pedido</h3>
      
      <div className="space-y-2 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.quantity}x {item.name}
              {item.notes && <span className="text-xs text-gray-500"> (com observações)</span>}
            </span>
            <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-menuOrange">R$ {cartTotal.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6 bg-menuOrange hover:bg-menuOrange/90 text-white"
        onClick={onCheckout}
        disabled={cartItems.length === 0}
      >
        Finalizar Pedido
      </Button>
    </div>
  );
};

export default CartSummary;
