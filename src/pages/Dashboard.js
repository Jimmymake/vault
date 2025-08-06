import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  CurrencyDollarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const Dashboard = () => {
  const { selectedInstitution } = useAuth();
  const [assetBalances, setAssetBalances] = useState({
    fiat: { USD: 1250000000, EUR: 890000000, GBP: 450000000 },
    crypto: { BTC: 1250, ETH: 8500, USDC: 5000000 },
    documents: 1250
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [vaultCases, setVaultCases] = useState([]);

  useEffect(() => {
    // Mock data loading
    setRecentActivity([
      {
        id: 1,
        type: 'deposit',
        asset: 'USD',
        amount: 50000000,
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: 'completed',
        user: 'Alice Johnson'
      },
      {
        id: 2,
        type: 'withdrawal',
        asset: 'BTC',
        amount: 25,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        status: 'pending',
        user: 'Bob Smith'
      },
      {
        id: 3,
        type: 'document_upload',
        asset: 'SWIFT Message',
        amount: null,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        status: 'completed',
        user: 'Carol Davis'
      },
      {
        id: 4,
        type: 'kyc_verification',
        asset: 'KYC Document',
        amount: null,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        status: 'pending',
        user: 'David Wilson'
      },
      {
        id: 5,
        type: 'deposit',
        asset: 'ETH',
        amount: 500,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        status: 'completed',
        user: 'Eve Brown'
      }
    ]);

    setVaultCases([
      {
        id: 1,
        type: 'kyc_pending',
        count: 12,
        priority: 'high',
        description: 'KYC verification pending'
      },
      {
        id: 2,
        type: 'aml_review',
        count: 5,
        priority: 'medium',
        description: 'AML compliance review required'
      },
      {
        id: 3,
        type: 'document_verification',
        count: 8,
        priority: 'low',
        description: 'Document verification in progress'
      }
    ]);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownIcon className="h-5 w-5 text-success-500" />;
      case 'withdrawal':
        return <ArrowUpIcon className="h-5 w-5 text-danger-500" />;
      case 'document_upload':
        return <DocumentTextIcon className="h-5 w-5 text-vault-500" />;
      case 'kyc_verification':
        return <ShieldCheckIcon className="h-5 w-5 text-warning-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4 text-success-500" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4 text-warning-500" />;
      case 'failed':
        return <XCircleIcon className="h-4 w-4 text-danger-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatAmount = (amount, asset) => {
    if (amount === null) return '-';
    if (asset === 'USD' || asset === 'EUR' || asset === 'GBP') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: asset,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    }
    return `${amount.toLocaleString()} ${asset}`;
  };

  const totalFiatValue = Object.values(assetBalances.fiat).reduce((sum, value) => sum + value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vault Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Real-time monitoring for {selectedInstitution}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-8 w-8 text-success-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Fiat Value</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${(totalFiatValue / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ShieldCheckIcon className="h-8 w-8 text-vault-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Crypto Assets</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Object.keys(assetBalances.crypto).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-8 w-8 text-warning-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Secure Documents</p>
              <p className="text-2xl font-semibold text-gray-900">
                {assetBalances.documents.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-danger-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Cases</p>
              <p className="text-2xl font-semibold text-gray-900">
                {vaultCases.reduce((sum, c) => sum + c.count, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Asset Balances */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Asset Balances</h3>
          
          {/* Fiat Assets */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Fiat Currencies</h4>
            <div className="space-y-3">
              {Object.entries(assetBalances.fiat).map(([currency, amount]) => (
                <div key={currency} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{currency}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatAmount(amount, currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Crypto Assets */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Digital Assets</h4>
            <div className="space-y-3">
              {Object.entries(assetBalances.crypto).map(([asset, amount]) => (
                <div key={asset} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{asset}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatAmount(amount, asset)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.type.replace('_', ' ').toUpperCase()}
                    </p>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(activity.status)}
                      <span className="text-xs text-gray-500">
                        {format(activity.timestamp, 'HH:mm')}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {activity.asset} {activity.amount && formatAmount(activity.amount, activity.asset)}
                  </p>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Vault Cases */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Open Vault Cases</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {vaultCases.map((vaultCase) => (
            <div key={vaultCase.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  vaultCase.priority === 'high' ? 'bg-danger-100 text-danger-800' :
                  vaultCase.priority === 'medium' ? 'bg-warning-100 text-warning-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {vaultCase.priority.toUpperCase()}
                </span>
                <span className="text-2xl font-bold text-gray-900">{vaultCase.count}</span>
              </div>
              <p className="text-sm text-gray-600">{vaultCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 