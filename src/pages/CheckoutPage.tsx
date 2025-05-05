
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerInfo, PaymentMethod, PaymentDetails } from "@/types";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import CustomerForm from "@/components/checkout/CustomerForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import { ArrowLeft } from "lucide-react";
import { sendOrderToWhatsApp, saveOrderToLocalStorage } from "@/services/orderService";

const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    if (!customerInfo.name.trim()) {
      toast({
        title: "Nome é obrigatório",
        description: "Por favor, informe seu nome",
        variant: "destructive",
      });
      return false;
    }

    if (deliveryMethod === "delivery") {
      if (!customerInfo.phone?.trim()) {
        toast({
          title: "Telefone é obrigatório para entrega",
          description: "Por favor, informe seu telefone",
          variant: "destructive",
        });
        return false;
      }

      if (!customerInfo.address?.trim()) {
        toast({
          title: "Endereço é obrigatório para entrega",
          description: "Por favor, informe seu endereço",
          variant: "destructive",
        });
        return false;
      }
    }

    if (paymentMethod === "cash" && paymentDetails.changeNeeded) {
      if (!paymentDetails.changeAmount || paymentDetails.changeAmount < cartTotal) {
        toast({
          title: "Valor para troco inválido",
          description: "O valor para troco deve ser maior que o total do pedido",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho para finalizar o pedido",
        variant: "destructive",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const order = {
      id: `order-${Date.now()}`,
      items: cartItems,
      totalAmount: cartTotal,
      deliveryMethod,
      customerInfo,
      paymentMethod,
      paymentDetails,
      orderDate: new Date().toISOString(),
      status: "pending" as const,
    };

    // Save order locally (demo purposes)
    saveOrderToLocalStorage(order);

    // Send to WhatsApp
    const sent = sendOrderToWhatsApp({
      items: cartItems,
      totalAmount: cartTotal,
      deliveryMethod,
      customerInfo,
      paymentMethod,
      paymentDetails,
    });

    if (sent) {
      toast({
        title: "Pedido enviado com sucesso!",
        description: "Seu pedido foi enviado para o WhatsApp da loja.",
      });
      clearCart();
      navigate("/success");
    } else {
      toast({
        title: "Erro ao enviar pedido",
        description: "Houve um problema ao enviar seu pedido. Tente novamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 flex items-center"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar ao Cardápio
      </Button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Finalizar Pedido</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <CustomerForm
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <PaymentForm
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              paymentDetails={paymentDetails}
              setPaymentDetails={setPaymentDetails}
              total={cartTotal}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center text-lg font-semibold mb-6">
              <span>Total do Pedido:</span>
              <span className="text-menuOrange">R$ {cartTotal.toFixed(2)}</span>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg bg-menuOrange hover:bg-menuOrange/90 text-white"
              disabled={isSubmitting || cartItems.length === 0}
            >
              {isSubmitting ? "Enviando..." : "Finalizar Pedido"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
