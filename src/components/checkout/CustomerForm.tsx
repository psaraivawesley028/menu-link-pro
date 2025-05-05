
import React from "react";
import { CustomerInfo } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CustomerFormProps {
  deliveryMethod: "delivery" | "pickup";
  setDeliveryMethod: (method: "delivery" | "pickup") => void;
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  deliveryMethod,
  setDeliveryMethod,
  customerInfo,
  setCustomerInfo,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Forma de Entrega</h3>
        <RadioGroup
          value={deliveryMethod}
          onValueChange={(value) => setDeliveryMethod(value as "delivery" | "pickup")}
          className="flex flex-col space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="delivery" id="delivery" />
            <Label htmlFor="delivery">Entrega</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup">Retirada</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            value={customerInfo.name}
            onChange={handleInputChange}
            placeholder="Seu nome completo"
            required
          />
        </div>

        {deliveryMethod === "delivery" && (
          <>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                value={customerInfo.phone || ""}
                onChange={handleInputChange}
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                name="address"
                value={customerInfo.address || ""}
                onChange={handleInputChange}
                placeholder="Rua, número, bairro, complemento"
                required
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerForm;
