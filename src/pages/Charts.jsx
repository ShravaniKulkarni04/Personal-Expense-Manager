import React from 'react';
import { Bar } from 'react-chartjs-2';

function Charts({ income, expense }) {
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount',
        data: [income, expense],
        backgroundColor: ['#27ae60', '#c0392b'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '400px', height: '300px', margin: '20px auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Charts;
