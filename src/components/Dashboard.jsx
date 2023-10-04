import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { getModelosdeArmas } from '../services/arma-services'; // Importe a função da API correta
import { Card } from 'react-bootstrap';

const ModelosdeArmasChart = () => {
    const [chartData,setChartData] = useState({
        options: {
           chart: {
             type: 'bar',
           },
           xaxis: {
             categories: [],
           },
         },
         series: [
           {
             name: 'Quantidade de Armas',
             data: [],
           },
         ],
    });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getModelosdeArmas(); // Chame sua função de API para obter os dados
        const data = response.data;

        // Extraia os dados da resposta da API
         const categories = data.map(item => item.modelo);
         const armaQuantidade = data.map(item => item.quantidadeArmas);

         // Atualize o estado do gráfico com os dados
        setChartData(prevState => ({
          ...prevState,
          options: {
            ...prevState.options,
            xaxis: {
              categories,
            },
          },
          series: [
            {
              data: armaQuantidade,
              color: "#1B1E23"
            },
          ],
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='px-5 py-2 col-12'>
      <Card.Header className="d-flex justify-content-start"><Card.Title> Quantidade de armas por modelo </Card.Title></Card.Header>
      <ApexCharts options={chartData.options} series={chartData.series} type="bar" height={350} className="col-12"/>
    </div>
  );
};

export default ModelosdeArmasChart;
