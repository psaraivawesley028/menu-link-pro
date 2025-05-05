
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuCategories from "@/components/menu/MenuCategories";
import MenuItems from "@/components/menu/MenuItems";
import MobileCartButton from "@/components/cart/MobileCartButton";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/context/CartContext";
import { categories, menuItems } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, X } from "lucide-react";

const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const [showMobileCart, setShowMobileCart] = useState(false);
  const { cartItems, cartCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Cardápio Digital</h1>
          <div className="hidden md:block">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  <span>Carrinho</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-menuOrange text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:w-[400px]">
                <SheetHeader className="flex flex-row justify-between items-center">
                  <SheetTitle>Seu Carrinho</SheetTitle>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </SheetHeader>
                <div className="mt-6 flex flex-col h-[calc(100vh-120px)]">
                  <div className="flex-1 overflow-y-auto pr-2">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-10">
                        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">Seu carrinho está vazio</h3>
                        <p className="text-gray-500">Adicione itens para continuar</p>
                      </div>
                    ) : (
                      cartItems.map((item) => <CartItem key={item.id} item={item} />)
                    )}
                  </div>
                  <div className="mt-6">
                    <CartSummary onCheckout={handleCheckout} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <MenuCategories
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <MenuItems items={menuItems} categoryId={activeCategory} />
        </div>
        <div className="hidden md:block md:w-1/3 sticky top-8 h-fit">
          <CartSummary onCheckout={handleCheckout} />
        </div>
      </div>

      <MobileCartButton onClick={() => setShowMobileCart(true)} />

      <Sheet open={showMobileCart} onOpenChange={setShowMobileCart}>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader className="flex flex-row justify-between items-center">
            <SheetTitle>Seu Carrinho</SheetTitle>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowMobileCart(false)}>
              <X className="h-4 w-4" />
            </Button>
          </SheetHeader>
          <div className="mt-6 flex flex-col h-[calc(80vh-120px)]">
            <div className="flex-1 overflow-y-auto">
              {cartItems.map((item) => <CartItem key={item.id} item={item} />)}
            </div>
            <div className="mt-6">
              <CartSummary onCheckout={handleCheckout} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuPage;
