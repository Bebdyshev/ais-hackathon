"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Define specific chart options types
type LineChartOptions = ChartOptions<'line'>;
type BarChartOptions = ChartOptions<'bar'>;
type DoughnutChartOptions = ChartOptions<'doughnut'>;
type PieChartOptions = ChartOptions<'pie'>;

// Color palettes
const primaryColors = [
  'rgba(59, 130, 246, 0.8)', // Blue
  'rgba(16, 185, 129, 0.8)', // Green
  'rgba(249, 115, 22, 0.8)', // Orange
  'rgba(139, 92, 246, 0.8)', // Purple
];

const backgroundColors = [
  'rgba(59, 130, 246, 0.2)',
  'rgba(16, 185, 129, 0.2)',
  'rgba(249, 115, 22, 0.2)',
  'rgba(139, 92, 246, 0.2)',
];

// AttendanceDonutChart component
export function AttendanceDonutChart({ 
  data: { present, late, absent } 
}: { 
  data: { present: number; late: number; absent: number } 
}) {
  const chartData: ChartData<'doughnut'> = {
    labels: ['Present', 'Late', 'Absent'],
    datasets: [
      {
        data: [present, late, absent],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // Green for present
          'rgba(249, 115, 22, 0.8)', // Orange for late
          'rgba(239, 68, 68, 0.8)',  // Red for absent
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: DoughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  return (
    <div className="relative h-full w-full">
      <Doughnut data={chartData} options={options} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="block text-3xl font-bold">{present.toFixed(1)}%</span>
          <span className="text-sm text-muted-foreground">Present</span>
        </div>
      </div>
    </div>
  );
}

// DailyTrendLineChart component
export function DailyTrendLineChart({ data }: { data: Record<string, number> }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Attendance Rate',
        data: values,
        borderColor: primaryColors[0],
        backgroundColor: backgroundColors[0],
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options: LineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        min: Math.max(0, Math.min(...values) - 5),
        max: 100,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

// ClassComparisonBarChart component
export function ClassComparisonBarChart({ data }: { data: Record<string, number> }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Attendance Rate',
        data: values,
        backgroundColor: labels.map((_, index) => primaryColors[index % primaryColors.length]),
      },
    ],
  };

  const options: BarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        min: Math.max(0, Math.min(...values) - 5),
        max: 100,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

// DayOfWeekBarChart component
export function DayOfWeekBarChart({ data }: { data: Record<string, number> }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Attendance Rate',
        data: values,
        backgroundColor: labels.map((_, index) => primaryColors[index % primaryColors.length]),
        borderWidth: 1,
      },
    ],
  };

  const options: BarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        min: Math.max(0, Math.min(...values) - 5),
        max: 100,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

// YearComparisonBarChart component
export function YearComparisonBarChart({ data }: { data: Record<string, number> }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Attendance Rate',
        data: values,
        backgroundColor: labels.map((_, index) => primaryColors[index % primaryColors.length]),
      },
    ],
  };

  const options: BarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        min: Math.max(0, Math.min(...values) - 5),
        max: 100,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

// MonthlyTrendLineChart component
export function MonthlyTrendLineChart({ data }: { data: Record<string, number> }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Attendance Rate',
        data: values,
        borderColor: primaryColors[1],
        backgroundColor: backgroundColors[1],
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options: LineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        min: Math.max(0, Math.min(...values) - 5),
        max: 100,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

// AchievementBarChart component
export function AchievementBarChart({ data }: { data: Record<string, number> }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Students (%)',
        data: values,
        backgroundColor: labels.map((_, index) => primaryColors[index % primaryColors.length]),
      },
    ],
  };

  const options: BarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}

// PointsDistributionPieChart component
export function PointsDistributionPieChart({ data }: { data: Record<string, number> }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData: ChartData<'pie'> = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.map((_, index) => primaryColors[index % primaryColors.length]),
        borderColor: labels.map((_, index) => primaryColors[index % primaryColors.length].replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };

  const options: PieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Pie data={chartData} options={options} />;
} 