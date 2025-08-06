import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const Analytics = () => {
  const [assetFlowData, setAssetFlowData] = useState([]);
  const [documentDistribution, setDocumentDistribution] = useState([]);
  const [accessFrequency, setAccessFrequency] = useState([]);
  const [realTimeEvents, setRealTimeEvents] = useState([]);

  useEffect(() => {
    // Mock asset flow data (last 30 days)
    const flowData = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      flowData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        deposits: Math.floor(Math.random() * 1000000) + 500000,
        withdrawals: Math.floor(Math.random() * 800000) + 200000,
        netFlow: Math.floor(Math.random() * 500000) - 250000
      });
    }
    setAssetFlowData(flowData);

    // Mock document distribution data
    setDocumentDistribution([
      { name: 'SWIFT Messages', value: 35, color: '#3B82F6' },
      { name: 'KYC Documents', value: 25, color: '#10B981' },
      { name: 'Contracts', value: 20, color: '#F59E0B' },
      { name: 'Compliance Reports', value: 15, color: '#EF4444' },
      { name: 'Other', value: 5, color: '#8B5CF6' }
    ]);

    // Mock access frequency by role
    setAccessFrequency([
      { role: 'Admin', accessCount: 45, color: '#EF4444' },
      { role: 'Officer', accessCount: 23, color: '#3B82F6' },
      { role: 'Audit', accessCount: 12, color: '#F59E0B' },
      { role: 'Viewer', accessCount: 8, color: '#10B981' }
    ]);

    // Mock real-time events
    const events = [
      {
        id: 1,
        type: 'deposit',
        message: 'Large USD deposit detected',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        severity: 'info'
      },
      {
        id: 2,
        type: 'withdrawal',
        message: 'BTC withdrawal request pending approval',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        severity: 'warning'
      },
      {
        id: 3,
        type: 'security',
        message: 'Multiple failed login attempts detected',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        severity: 'danger'
      },
      {
        id: 4,
        type: 'compliance',
        message: 'KYC verification completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        severity: 'success'
      }
    ];
    setRealTimeEvents(events);
  }, []);

  const getEventIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowTrendingUpIcon className="h-4 w-4 text-success-500" />;
      case 'withdrawal':
        return <ArrowTrendingUpIcon className="h-4 w-4 text-danger-500" />;
      case 'security':
        return <ExclamationTriangleIcon className="h-4 w-4 text-danger-500" />;
      case 'compliance':
        return <DocumentTextIcon className="h-4 w-4 text-vault-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'success':
        return 'bg-success-100 text-success-800';
      case 'warning':
        return 'bg-warning-100 text-warning-800';
      case 'danger':
        return 'bg-danger-100 text-danger-800';
      case 'info':
        return 'bg-vault-100 text-vault-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Real-time insights and performance metrics
        </p>
      </div>

      {/* Asset Flow Chart */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <ArrowTrendingUpIcon className="h-5 w-5 mr-2" />
          Asset Flow Trends (Last 30 Days)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={assetFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip 
                formatter={(value) => [formatCurrency(value), 'Amount']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="deposits" 
                stackId="1" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6}
                name="Deposits"
              />
              <Area 
                type="monotone" 
                dataKey="withdrawals" 
                stackId="1" 
                stroke="#EF4444" 
                fill="#EF4444" 
                fillOpacity={0.6}
                name="Withdrawals"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Document Distribution */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Document Type Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={documentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {documentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} documents`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Access Frequency by Role */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <UserGroupIcon className="h-5 w-5 mr-2" />
            Access Frequency by Role
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accessFrequency}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} accesses`, 'Count']} />
                <Bar dataKey="accessCount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Real-time Events */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <ClockIcon className="h-5 w-5 mr-2" />
          Real-time Events
        </h3>
        <div className="space-y-3">
          {realTimeEvents.map((event) => (
            <div key={event.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
              <div className="flex-shrink-0">
                {getEventIcon(event.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{event.message}</p>
                <p className="text-xs text-gray-500">
                  {event.timestamp.toLocaleTimeString()}
                </p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                {event.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ArrowTrendingUpIcon className="h-8 w-8 text-success-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Deposits (30d)</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(assetFlowData.reduce((sum, day) => sum + day.deposits, 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ArrowTrendingUpIcon className="h-8 w-8 text-danger-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Withdrawals (30d)</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(assetFlowData.reduce((sum, day) => sum + day.withdrawals, 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-8 w-8 text-vault-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Documents Processed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {documentDistribution.reduce((sum, doc) => sum + doc.value, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-warning-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Access Events</p>
              <p className="text-2xl font-semibold text-gray-900">
                {accessFrequency.reduce((sum, role) => sum + role.accessCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-vault-600">99.9%</div>
            <div className="text-sm text-gray-500">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success-600">2.3s</div>
            <div className="text-sm text-gray-500">Average Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning-600">1,247</div>
            <div className="text-sm text-gray-500">Transactions Today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 