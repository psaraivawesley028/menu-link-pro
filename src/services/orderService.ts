
import { Order, CustomerInfo, PaymentMethod, PaymentDetails, CartItem } from "@/types";

interface WhatsAppOrderData {
  items: CartItem[];
  totalAmount: number;
  deliveryMethod: "delivery" | "pickup";
  customerInfo: CustomerInfo;
  paymentMethod: PaymentMethod;
  paymentDetails: PaymentDetails;
}

export const sendOrderToWhatsApp = (orderData: WhatsAppOrderData): boolean => {
  try {
    // Format the items for better readability in WhatsApp
    const formattedItems = orderData.items.map(item => {
      const notes = item.notes ? `\n   *Observações:* ${item.notes}` : '';
      return `- ${item.quantity}x ${item.name} (R$ ${item.price.toFixed(2)} cada) = R$ ${(item.quantity * item.price).toFixed(2)}${notes}`;
    }).join('\n');

    // Format payment details
    let paymentInfo = `*Forma de pagamento:* ${getPaymentMethodText(orderData.paymentMethod)}`;
    
    if (orderData.paymentMethod === 'cash' && orderData.paymentDetails.changeNeeded) {
      paymentInfo += `\n*Troco para:* R$ ${orderData.paymentDetails.changeAmount?.toFixed(2)}`;
    }

    // Format customer info
    let customerInfo = `*Nome:* ${orderData.customerInfo.name}`;
    if (orderData.deliveryMethod === 'delivery') {
      customerInfo += `\n*Telefone:* ${orderData.customerInfo.phone}`;
      customerInfo += `\n*Endereço:* ${orderData.customerInfo.address}`;
    }

    // Build the complete message
    const message = `🍔 *NOVO PEDIDO* 🍔\n\n` +
      `*Itens do pedido:*\n${formattedItems}\n\n` +
      `*Total:* R$ ${orderData.totalAmount.toFixed(2)}\n\n` +
      `*Método de entrega:* ${orderData.deliveryMethod === 'delivery' ? 'Entrega' : 'Retirada'}\n\n` +
      `*Dados do cliente:*\n${customerInfo}\n\n` +
      `${paymentInfo}`;

    // WhatsApp API URL with the formatted message
    // We're using a fake phone number here (5551999999999)
    const whatsappUrl = `https://wa.me/5551999999999?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    return true;
  } catch (error) {
    console.error("Error sending order to WhatsApp:", error);
    return false;
  }
};

// Helper function to get a readable payment method text
const getPaymentMethodText = (method: PaymentMethod): string => {
  switch (method) {
    case 'credit':
      return 'Cartão de Crédito';
    case 'debit':
      return 'Cartão de Débito';
    case 'cash':
      return 'Dinheiro';
    case 'pix':
      return 'PIX';
    default:
      return method;
  }
};

// Save order to local storage (for demo purposes)
export const saveOrderToLocalStorage = (order: Order): boolean => {
  try {
    // Get existing orders
    const existingOrdersJson = localStorage.getItem('orders');
    const existingOrders = existingOrdersJson ? JSON.parse(existingOrdersJson) : [];
    
    // Add the new order
    const updatedOrders = [...existingOrders, order];
    
    // Save back to localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    return true;
  } catch (error) {
    console.error("Error saving order to localStorage:", error);
    return false;
  }
};

// Get orders from local storage (for demo purposes)
export const getOrdersFromLocalStorage = (): Order[] => {
  try {
    const ordersJson = localStorage.getItem('orders');
    return ordersJson ? JSON.parse(ordersJson) : [];
  } catch (error) {
    console.error("Error getting orders from localStorage:", error);
    return [];
  }
};
