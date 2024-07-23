import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaChartLine, FaDollarSign, FaHamburger } from 'react-icons/fa';

const DashboardPage = () => {
  // Estado para controlar o período selecionado para cada gráfico
  const [orderPeriod, setOrderPeriod] = useState('daily');
  const [revenuePeriod, setRevenuePeriod] = useState('daily');
  const [productPeriod, setProductPeriod] = useState('daily');

  // Dados fictícios para simulação
  const orderData = {
    daily: [5, 8, 3, 10, 6, 4, 9, 7], // Dados por hora
    weekly: [25, 40, 30, 45, 50, 35, 60], // Dados por dia
    monthly: [150, 200, 180, 220] // Dados por semana
  };

  const revenueData = {
    daily: [100, 200, 150, 300, 250, 200, 400, 350], // Dados por hora
    weekly: [500, 800, 700, 950, 1000, 850, 1200], // Dados por dia
    monthly: [3500, 4000, 3900, 4200] // Dados por semana
  };

  const mostOrderedProducts = {
    daily: 'Café Expresso',
    weekly: 'Latte',
    monthly: 'Cappuccino'
  };

  // Função para obter rótulos com base no período
  const getLabels = (period) => {
    if (period === 'daily') {
      return ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    } else if (period === 'weekly') {
      return ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    } else if (period === 'monthly') {
      return ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
    }
  };

  // Função para obter dados com base no período
  const getChartData = (data, period) => {
    return {
      labels: getLabels(period),
      datasets: [
        {
          label:
            period === 'daily'
              ? 'Por Hora'
              : period === 'weekly'
              ? 'Por Dia'
              : 'Por Semana',
          data: data[period],
          backgroundColor: 'rgba(79, 70, 229, 0.5)',
          borderColor: '#4f46e5',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  // Opções de gráfico
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#555',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
          color: '#555',
        },
        grid: {
          color: '#ddd',
        },
      }
    }
  };

  // Função para renderizar os botões de seleção de período
  const renderPeriodButtons = (period, setPeriod) => (
    <div className="flex justify-center mb-6 space-x-2">
      {['daily', 'weekly', 'monthly'].map((timeFrame, index) => (
        <button
          key={index}
          onClick={() => setPeriod(timeFrame)}
          className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-300 shadow ${
            period === timeFrame
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white'
          }`}
        >
          <FaChartLine className="mr-2" />
          {timeFrame === 'daily' ? 'Dia' : timeFrame === 'weekly' ? 'Semana' : 'Mês'}
        </button>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 lg:p-6 pt-20">
      <div className="mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Estatísticas de Vendas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Pedidos */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
              <FaHamburger className="text-red-500 mr-2" />
              Número de Pedidos
            </h2>
            {renderPeriodButtons(orderPeriod, setOrderPeriod)}
            <div className="h-64">
              <Line
                data={getChartData(orderData, orderPeriod)}
                options={chartOptions}
              />
            </div>
          </div>

          {/* Gráfico de Receita */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
              <FaDollarSign className="text-green-500 mr-2" />
              Receita
            </h2>
            {renderPeriodButtons(revenuePeriod, setRevenuePeriod)}
            <div className="h-64">
              <Line
                data={getChartData(revenueData, revenuePeriod)}
                options={chartOptions}
              />
            </div>
          </div>
        </div>

        {/* Produto mais pedido */}
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Produto Mais Pedido
          </h2>
          {renderPeriodButtons(productPeriod, setProductPeriod)}
          <div className="mt-4 p-6 bg-gray-100 rounded-lg shadow-inner">
            <p className="text-gray-700 text-2xl font-bold">
              {mostOrderedProducts[productPeriod]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
