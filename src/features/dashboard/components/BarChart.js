import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart(){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      
      const labels = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Name of Buisness',
            data: labels.map(() => { return Math.random() * 1000 + 500 }),
            backgroundColor: 'rgb(87 25 217)',
          },
          // {
          //   label: 'Store 2',
          //   data: labels.map(() => { return Math.random() * 1000 + 500 }),
          //   backgroundColor: 'rgba(53, 162, 235, 1)',
          // },
        ],
      };

    return(
      <TitleCard title={"Conversations Per Day"}>
            <Bar options={options} data={data}  />
      </TitleCard>

    )
}


export default BarChart