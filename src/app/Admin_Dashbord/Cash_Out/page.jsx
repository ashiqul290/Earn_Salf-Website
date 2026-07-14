'use client'
import { useState } from 'react';
import { FaWallet, FaClock, FaCheckCircle, FaTimesCircle, FaEye, FaDownload } from 'react-icons/fa';

export default function CashoutComponent() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const cashoutData = {
    pending: [
      {
        id: 'CO-001',
        amount: '৳ 50,000',
        date: '2024-01-15',
        method: 'Bank Transfer',
        status: 'pending',
        user: 'Rajib Ahmed',
        initials: 'RA'
      },
      {
        id: 'CO-002',
        amount: '৳ 75,000',
        date: '2024-01-14',
        method: 'Mobile Banking',
        status: 'pending',
        user: 'Fatima Khan',
        initials: 'FK'
      },
      {
        id: 'CO-003',
        amount: '৳ 30,000',
        date: '2024-01-13',
        method: 'Bank Transfer',
        status: 'pending',
        user: 'Hasan Ali',
        initials: 'HA'
      }
    ],
    confirmed: [
      {
        id: 'CO-004',
        amount: '৳ 100,000',
        date: '2024-01-12',
        method: 'Bank Transfer',
        status: 'confirmed',
        user: 'Shahnaz Begum',
        initials: 'SB',
        processedDate: '2024-01-13'
      },
      {
        id: 'CO-005',
        amount: '৳ 45,000',
        date: '2024-01-11',
        method: 'Mobile Banking',
        status: 'confirmed',
        user: 'Karim Hassan',
        initials: 'KH',
        processedDate: '2024-01-12'
      }
    ],
    rejected: [
      {
        id: 'CO-006',
        amount: '৳ 25,000',
        date: '2024-01-10',
        method: 'Bank Transfer',
        status: 'rejected',
        user: 'Noor Jahan',
        initials: 'NJ',
        reason: 'Invalid account details'
      }
    ]
  };

  const tabsConfig = [
    { key: 'pending', label: 'Pending', icon: FaClock },
    { key: 'confirmed', label: 'Confirmed', icon: FaCheckCircle },
    { key: 'rejected', label: 'Rejected', icon: FaTimesCircle }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-gradient-to-r from-yellow-100 to-yellow-50', text: 'text-yellow-600', label: 'Pending', border: 'border-yellow-200' },
      confirmed: { bg: 'bg-gradient-to-r from-green-100 to-green-50', text: 'text-green-600', label: 'Confirmed', border: 'border-green-200' },
      rejected: { bg: 'bg-gradient-to-r from-red-100 to-red-50', text: 'text-red-600', label: 'Rejected', border: 'border-red-200' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold ${config.bg} ${config.text} border ${config.border}`}>
        {config.label}
      </span>
    );
  };

  const currentData = cashoutData[activeTab] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-3 sm:p-6 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
        .card-hover {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-2">
          <div className="p-2 sm:p-3 rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#FFEE57] to-yellow-400 shadow-lg flex-shrink-0">
            <FaWallet className="text-gray-800 text-xl sm:text-3xl" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">Cashout</h1>
            <p className="text-gray-600 text-xs sm:text-base mt-0.5 sm:mt-1">Manage withdrawal requests</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <SummaryCard
          title="Pending"
          count={cashoutData.pending.length}
          amount={`৳ ${(cashoutData.pending.reduce((sum, req) => sum + parseInt(req.amount.replace(/[^0-9]/g, '')), 0)).toLocaleString()}`}
          gradient="from-yellow-400 to-yellow-500"
          icon={FaClock}
        />
        <SummaryCard
          title="Confirmed"
          count={cashoutData.confirmed.length}
          amount={`৳ ${(cashoutData.confirmed.reduce((sum, req) => sum + parseInt(req.amount.replace(/[^0-9]/g, '')), 0)).toLocaleString()}`}
          gradient="from-green-400 to-green-500"
          icon={FaCheckCircle}
        />
        <SummaryCard
          title="Rejected"
          count={cashoutData.rejected.length}
          amount={`৳ ${(cashoutData.rejected.reduce((sum, req) => sum + parseInt(req.amount.replace(/[^0-9]/g, '')), 0)).toLocaleString()}`}
          gradient="from-red-400 to-red-500"
          icon={FaTimesCircle}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 bg-white/40 backdrop-filter backdrop-blur-lg rounded-xl sm:rounded-2xl p-2 w-full sm:w-fit">
        {tabsConfig.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap text-xs sm:text-base flex-shrink-0 ${
              activeTab === key
                ? `bg-gradient-to-r ${key === 'pending' ? 'from-yellow-400 to-yellow-500' : key === 'confirmed' ? 'from-green-400 to-green-500' : 'from-red-400 to-red-500'} text-white shadow-lg scale-105`
                : 'text-gray-700 hover:bg-white/50'
            }`}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block mb-8 overflow-x-auto">
        <div className="bg-white/60 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20 min-w-full">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Method</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-gray-200/50 hover:bg-gradient-to-r hover:from-[#FFEE57]/10 hover:to-yellow-100/10 transition-all duration-300"
                >
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{request.id}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                        {request.initials}
                      </div>
                      <span className="text-gray-900 font-medium">{request.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#FFEE57]">{request.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{request.method}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{request.date}</td>
                  <td className="px-6 py-4">{getStatusBadge(request.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="p-3 hover:bg-[#FFEE57]/20 rounded-xl transition-all duration-300 text-[#FFEE57] font-bold hover:scale-110"
                    >
                      <FaEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards - Mobile/Tablet */}
      <div className="md:hidden space-y-3 sm:space-y-4 mb-8">
        {currentData.map((request) => (
          <div
            key={request.id}
            className="card-hover bg-white/60 backdrop-filter backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-white/20"
          >
            <div className="flex justify-between items-start gap-2 mb-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-md flex-shrink-0">
                  {request.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-500">{request.id}</p>
                  <p className="text-sm font-bold text-gray-900 truncate">{request.user}</p>
                </div>
              </div>
              {getStatusBadge(request.status)}
            </div>

            <div className="bg-gradient-to-r from-[#FFEE57]/10 to-yellow-100/10 rounded-lg sm:rounded-xl p-3 mb-3 border border-yellow-200/30">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-0.5">Amount</p>
              <p className="text-lg sm:text-xl font-black text-[#FFEE57]">{request.amount}</p>
            </div>

            <div className="space-y-2 text-xs mb-3">
              <div className="flex justify-between p-2 bg-gray-50/50 rounded-lg border border-gray-200/50">
                <span className="font-bold text-gray-600">Method</span>
                <span className="font-bold text-gray-900">{request.method}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50/50 rounded-lg border border-gray-200/50">
                <span className="font-bold text-gray-600">Date</span>
                <span className="font-bold text-gray-900">{request.date}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedRequest(request)}
              className="w-full px-3 py-2 bg-gradient-to-r from-[#FFEE57] to-yellow-400 text-gray-900 rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <FaEye size={14} />
              Details
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {currentData.length === 0 && (
        <div className="text-center py-12 sm:py-16 bg-white/40 backdrop-filter backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-white/20">
          <FaWallet className="text-5xl sm:text-6xl text-gray-300 mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-600 text-sm sm:text-lg font-medium">No requests found</p>
        </div>
      )}

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-end sm:items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-filter backdrop-blur-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/30 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 border-b border-gray-200 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Details</h2>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-white rounded-lg transition text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Request ID</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{selectedRequest.id}</p>
              </div>

              <div className="bg-gradient-to-br from-[#FFEE57]/20 to-yellow-100 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-yellow-200">
                <p className="text-xs font-bold text-yellow-700 uppercase tracking-widest mb-1">Amount</p>
                <p className="text-2xl sm:text-4xl font-black text-[#FFEE57]">{selectedRequest.amount}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg sm:rounded-2xl p-3 sm:p-4 border border-gray-200">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">User</p>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                      {selectedRequest.initials}
                    </div>
                    <span className="font-bold text-gray-900 text-xs sm:text-sm truncate">{selectedRequest.user}</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg sm:rounded-2xl p-3 sm:p-4 border border-gray-200">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Method</p>
                  <p className="font-bold text-gray-900 text-xs sm:text-sm">{selectedRequest.method}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg sm:rounded-2xl p-3 sm:p-4 border border-gray-200">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Date</p>
                  <p className="font-bold text-gray-900 text-xs sm:text-sm">{selectedRequest.date}</p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg sm:rounded-2xl p-3 sm:p-4 border border-gray-200">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                </div>
              </div>

              {selectedRequest.processedDate && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-green-200">
                  <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-1">Processed</p>
                  <p className="font-bold text-green-900 text-sm">{selectedRequest.processedDate}</p>
                </div>
              )}

              {selectedRequest.reason && (
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-red-200">
                  <p className="text-xs font-bold text-red-700 uppercase tracking-widest mb-1">Reason</p>
                  <p className="font-bold text-red-900 text-sm">{selectedRequest.reason}</p>
                </div>
              )}

              {selectedRequest.status === 'pending' && (
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                  <button className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-green-400 to-emerald-500 hover:shadow-lg text-white rounded-lg sm:rounded-xl font-bold transition-all duration-300 hover:scale-105 text-xs sm:text-base">
                    Approve
                  </button>
                  <button className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-red-400 to-pink-500 hover:shadow-lg text-white rounded-lg sm:rounded-xl font-bold transition-all duration-300 hover:scale-105 text-xs sm:text-base">
                    Reject
                  </button>
                </div>
              )}

              <button className="w-full px-4 py-2 sm:py-3 bg-gradient-to-r from-[#FFEE57] to-yellow-400 text-gray-900 rounded-lg sm:rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 text-xs sm:text-base">
                <FaDownload size={16} />
                Download Receipt
              </button>

              <button
                onClick={() => setSelectedRequest(null)}
                className="w-full px-4 py-2 sm:py-3 bg-gray-200/50 hover:bg-gray-300/50 text-gray-900 rounded-lg sm:rounded-xl font-bold transition-all duration-300 text-xs sm:text-base"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, count, amount, gradient, icon: Icon }) {
  return (
    <div className="card-hover bg-white/60 backdrop-filter backdrop-blur-lg rounded-xl sm:rounded-3xl p-4 sm:p-5 md:p-6 shadow-lg border border-white/20">
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <div className="flex-1">
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">{count}</h3>
        </div>
        <div className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-2xl bg-gradient-to-br ${gradient} shadow-lg flex-shrink-0`}>
          <Icon className="text-white text-base sm:text-xl md:text-2xl" />
        </div>
      </div>
      <p className="text-gray-700 text-xs sm:text-sm md:text-base font-bold">{amount}</p>
    </div>
  );
}