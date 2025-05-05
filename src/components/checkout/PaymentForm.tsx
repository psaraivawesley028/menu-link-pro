
import React, { useState } from "react";
import { PaymentMethod, PaymentDetails } from "@/types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, Banknote, CopyIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PaymentFormProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
  total: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentMethod,
  setPaymentMethod,
  paymentDetails,
  setPaymentDetails,
  total,
}) => {
  const [needChange, setNeedChange] = useState(paymentDetails.changeNeeded || false);
  const { toast } = useToast();
  
  // Mock Pix Key
  const pixKey = "12345678900"; 

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as PaymentMethod);
    
    // Reset payment details when changing method
    if (value === "pix") {
      setPaymentDetails({ pixKey });
    } else if (value === "cash") {
      setPaymentDetails({ 
        changeNeeded: needChange,
        changeAmount: needChange ? paymentDetails.changeAmount || 0 : undefined 
      });
    } else {
      setPaymentDetails({});
    }
  };

  const handleNeedChangeToggle = (need: boolean) => {
    setNeedChange(need);
    setPaymentDetails({
      ...paymentDetails,
      changeNeeded: need,
      changeAmount: need ? paymentDetails.changeAmount || 0 : undefined
    });
  };

  const handleChangeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value);
    setPaymentDetails({
      ...paymentDetails,
      changeAmount: amount
    });
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    toast({
      title: "Chave PIX copiada!",
      description: "A chave PIX foi copiada para a área de transferência.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Forma de Pagamento</h3>
        <RadioGroup
          value={paymentMethod}
          onValueChange={handlePaymentMethodChange}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="credit" id="credit" className="sr-only" />
            <Label htmlFor="credit" className="cursor-pointer flex flex-col items-center">
              <CreditCard className="h-6 w-6 mb-2 text-menuOrange" />
              <span>Cartão de Crédito</span>
            </Label>
          </div>

          <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="debit" id="debit" className="sr-only" />
            <Label htmlFor="debit" className="cursor-pointer flex flex-col items-center">
              <CreditCard className="h-6 w-6 mb-2 text-menuOrange" />
              <span>Cartão de Débito</span>
            </Label>
          </div>

          <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="cash" id="cash" className="sr-only" />
            <Label htmlFor="cash" className="cursor-pointer flex flex-col items-center">
              <Banknote className="h-6 w-6 mb-2 text-menuOrange" />
              <span>Dinheiro</span>
            </Label>
          </div>

          <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <RadioGroupItem value="pix" id="pix" className="sr-only" />
            <Label htmlFor="pix" className="cursor-pointer flex flex-col items-center">
              <DollarSign className="h-6 w-6 mb-2 text-menuOrange" />
              <span>PIX</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {paymentMethod === "cash" && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex space-x-4">
            <Button
              type="button"
              variant={needChange ? "default" : "outline"}
              className={needChange ? "bg-menuOrange hover:bg-menuOrange/90" : ""}
              onClick={() => handleNeedChangeToggle(true)}
            >
              Preciso de troco
            </Button>
            <Button
              type="button"
              variant={!needChange ? "default" : "outline"}
              className={!needChange ? "bg-menuOrange hover:bg-menuOrange/90" : ""}
              onClick={() => handleNeedChangeToggle(false)}
            >
              Não preciso de troco
            </Button>
          </div>

          {needChange && (
            <div>
              <Label htmlFor="changeAmount">Para quanto?</Label>
              <Input
                id="changeAmount"
                type="number"
                min={total}
                step="0.01"
                value={paymentDetails.changeAmount || ""}
                onChange={handleChangeAmountChange}
                placeholder="Valor em R$"
              />
              {paymentDetails.changeAmount && paymentDetails.changeAmount > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  Troco para: R$ {paymentDetails.changeAmount.toFixed(2)}
                  <br />
                  Valor do troco: R$ {(paymentDetails.changeAmount - total).toFixed(2)}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {paymentMethod === "pix" && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg text-center">
          <p className="font-medium">Chave PIX</p>
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-white px-4 py-2 rounded border font-mono">
              {pixKey}
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={copyPixKey}
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Após realizar o pagamento, finalize o pedido clicando no botão abaixo.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
