
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockSalesReport } from "@/services/mockData";
import { ArrowLeft } from "lucide-react";

const COLORS = ['#FF6B35', '#2EC4B6', '#F9CB40', '#7C3AED', '#E11D48'];

const AdminDashboard: React.FC = () => {
  const [period, setPeriod] = useState<'daily' | 'monthly'>('daily');
  const navigate = useNavigate();

  const getBarData = () => {
    return period === 'daily' 
      ? mockSalesReport.dailySales.map(day => ({
          name: new Date(day.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
          Vendas: day.sales,
          Pedidos: day.orders
        }))
      : mockSalesReport.monthlySales.map(month => ({
          name: new Date(month.month + '-01').toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
          Vendas: month.sales,
          Pedidos: month.orders
        }));
  };

  const getPieData = () => {
    return mockSalesReport.topProducts.map(product => ({
      name: product.name,
      value: product.revenue
    }));
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <Button
            variant="ghost"
            className="mb-4 sm:mb-0 flex items-center"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Cardápio
          </Button>
        </div>
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Vendas Totais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {mockSalesReport.totalSales.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Número de Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSalesReport.orderCount}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Valor Médio por Pedido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {mockSalesReport.averageOrderValue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Vendas por Período</CardTitle>
                <div className="flex space-x-2">
                  <Button 
                    variant={period === 'daily' ? 'default' : 'outline'}
                    onClick={() => setPeriod('daily')}
                    className={period === 'daily' ? 'bg-menuOrange hover:bg-menuOrange/90' : ''}
                  >
                    Diário
                  </Button>
                  <Button 
                    variant={period === 'monthly' ? 'default' : 'outline'}
                    onClick={() => setPeriod('monthly')}
                    className={period === 'monthly' ? 'bg-menuOrange hover:bg-menuOrange/90' : ''}
                  >
                    Mensal
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={getBarData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: any) => [`R$ ${Number(value).toFixed(2)}`, undefined]}
                    />
                    <Bar dataKey="Vendas" fill="#FF6B35" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Produtos Mais Vendidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSalesReport.topProducts.map((product, index) => (
                    <div key={product.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span>{product.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-600 text-sm">{product.quantity} vendidos</span>
                        <span className="font-medium">R$ {product.revenue.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getPieData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {getPieData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => [`R$ ${Number(value).toFixed(2)}`, undefined]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
