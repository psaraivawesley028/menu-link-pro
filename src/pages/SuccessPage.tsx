
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  // Redirect to menu after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mx-auto w-16 h-16 bg-menuTeal rounded-full flex items-center justify-center mb-6">
          <CheckIcon className="h-8 w-8 text-white" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Pedido Enviado com Sucesso!</h1>
        
        <p className="text-gray-600 mb-8">
          Seu pedido foi enviado para o WhatsApp da loja. Em breve entraremos em contato para confirmar os detalhes.
        </p>
        
        <Button 
          onClick={() => navigate("/")}
          className="w-full bg-menuOrange hover:bg-menuOrange/90 text-white"
        >
          Voltar ao Cardápio
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
