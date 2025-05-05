
import { MenuItem, Category, SalesReport } from "@/types";

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Hambúrgueres",
    image: "/placeholder.svg"
  },
  {
    id: "cat2",
    name: "Pizzas",
    image: "/placeholder.svg"
  },
  {
    id: "cat3",
    name: "Sobremesas",
    image: "/placeholder.svg"
  },
  {
    id: "cat4",
    name: "Bebidas",
    image: "/placeholder.svg"
  }
];

export const menuItems: MenuItem[] = [
  // Hambúrgueres
  {
    id: "item1",
    name: "X-Bacon Especial",
    description: "Hambúrguer artesanal, bacon crocante, queijo cheddar, alface, tomate e molho especial",
    price: 28.90,
    image: "/placeholder.svg",
    category: "cat1"
  },
  {
    id: "item2",
    name: "Cheeseburger Duplo",
    description: "Dois hambúrgueres, queijo prato derretido, cebola caramelizada e molho da casa",
    price: 32.90,
    image: "/placeholder.svg",
    category: "cat1"
  },
  {
    id: "item3",
    name: "Vegetariano",
    description: "Hambúrguer de grão de bico, rúcula, tomate seco e molho de iogurte",
    price: 26.90,
    image: "/placeholder.svg",
    category: "cat1"
  },
  
  // Pizzas
  {
    id: "item4",
    name: "Pizza Margherita",
    description: "Molho de tomate, mussarela fresca, manjericão e azeite extra virgem",
    price: 45.90,
    image: "/placeholder.svg",
    category: "cat2"
  },
  {
    id: "item5",
    name: "Pizza Pepperoni",
    description: "Molho de tomate, queijo mussarela e pepperoni",
    price: 49.90,
    image: "/placeholder.svg",
    category: "cat2"
  },
  {
    id: "item6",
    name: "Pizza Quatro Queijos",
    description: "Molho de tomate, mussarela, gorgonzola, parmesão e provolone",
    price: 52.90,
    image: "/placeholder.svg",
    category: "cat2"
  },
  
  // Sobremesas
  {
    id: "item7",
    name: "Brownie com Sorvete",
    description: "Brownie caseiro quente com bola de sorvete de baunilha",
    price: 18.90,
    image: "/placeholder.svg",
    category: "cat3"
  },
  {
    id: "item8",
    name: "Pudim de Leite Condensado",
    description: "Tradicional pudim de leite condensado com calda de caramelo",
    price: 15.90,
    image: "/placeholder.svg",
    category: "cat3"
  },
  
  // Bebidas
  {
    id: "item9",
    name: "Refrigerante Cola",
    description: "Lata 350ml",
    price: 6.90,
    image: "/placeholder.svg",
    category: "cat4"
  },
  {
    id: "item10",
    name: "Suco Natural de Laranja",
    description: "Copo 300ml",
    price: 9.90,
    image: "/placeholder.svg",
    category: "cat4"
  },
  {
    id: "item11",
    name: "Água Mineral",
    description: "Garrafa 500ml",
    price: 4.90,
    image: "/placeholder.svg",
    category: "cat4"
  }
];

export const mockSalesReport: SalesReport = {
  totalSales: 12450.75,
  orderCount: 342,
  averageOrderValue: 36.41,
  topProducts: [
    {
      id: "item1",
      name: "X-Bacon Especial",
      quantity: 156,
      revenue: 4508.40
    },
    {
      id: "item4",
      name: "Pizza Margherita",
      quantity: 89,
      revenue: 4085.10
    },
    {
      id: "item9",
      name: "Refrigerante Cola",
      quantity: 201,
      revenue: 1386.90
    },
    {
      id: "item7",
      name: "Brownie com Sorvete",
      quantity: 75,
      revenue: 1417.50
    }
  ],
  dailySales: [
    { date: "2023-10-01", sales: 456.90, orders: 12 },
    { date: "2023-10-02", sales: 512.75, orders: 15 },
    { date: "2023-10-03", sales: 389.45, orders: 11 },
    { date: "2023-10-04", sales: 623.20, orders: 18 },
    { date: "2023-10-05", sales: 578.50, orders: 16 },
    { date: "2023-10-06", sales: 745.80, orders: 21 },
    { date: "2023-10-07", sales: 856.40, orders: 24 }
  ],
  monthlySales: [
    { month: "2023-05", sales: 8954.30, orders: 245 },
    { month: "2023-06", sales: 10123.45, orders: 278 },
    { month: "2023-07", sales: 9876.20, orders: 263 },
    { month: "2023-08", sales: 11543.65, orders: 312 },
    { month: "2023-09", sales: 10896.55, orders: 298 },
    { month: "2023-10", sales: 12450.75, orders: 342 }
  ]
};
