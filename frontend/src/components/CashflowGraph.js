import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphContainer = styled.div`
  width: calc(100% - 40px);
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  padding: 20px;
  margin-left: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TimePeriodToggle = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const ToggleButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background: ${props => props.active ? '#4CAF50' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${props => props.active ? '#4CAF50' : 'rgba(255, 255, 255, 0.2)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CashflowGraph = ({ transactions }) => {
  const [timePeriod, setTimePeriod] = useState('daily');
  const [availablePeriods, setAvailablePeriods] = useState({
    daily: true,
    weekly: false,
    monthly: false
  });

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;

    // Calculate available time periods based on data range
    const dates = transactions.map(t => new Date(t.date));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    const dateRangeInDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);

    setAvailablePeriods({
      daily: true,
      weekly: dateRangeInDays >= 7,
      monthly: dateRangeInDays >= 30
    });
  }, [transactions]);

  const processData = () => {
    if (!transactions || transactions.length === 0) return { labels: [], datasets: [] };

    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let groupedData = {};

    sortedTransactions.forEach(transaction => {
      const date = new Date(transaction.date);
      let key;

      switch (timePeriod) {
        case 'daily':
          key = date.toISOString().split('T')[0];
          break;
        case 'weekly':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        default:
          key = date.toISOString().split('T')[0];
      }

      if (!groupedData[key]) {
        groupedData[key] = 0;
      }
      groupedData[key] += transaction.amount;
    });

    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    return {
      labels,
      datasets: [
        {
          label: 'Cashflow',
          data,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1
        }
      ]
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Cashflow Over Time',
        color: 'white'
      }
    },
    scales: {
      y: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <GraphContainer>
      <TimePeriodToggle>
        <ToggleButton
          active={timePeriod === 'daily'}
          onClick={() => setTimePeriod('daily')}
        >
          Daily
        </ToggleButton>
        <ToggleButton
          active={timePeriod === 'weekly'}
          onClick={() => setTimePeriod('weekly')}
          disabled={!availablePeriods.weekly}
        >
          Weekly
        </ToggleButton>
        <ToggleButton
          active={timePeriod === 'monthly'}
          onClick={() => setTimePeriod('monthly')}
          disabled={!availablePeriods.monthly}
        >
          Monthly
        </ToggleButton>
      </TimePeriodToggle>
      <Line data={processData()} options={options} />
    </GraphContainer>
  );
};

export default CashflowGraph; 