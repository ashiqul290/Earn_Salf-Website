"use client";

import { useState } from "react";
import { FaCheck, FaTimes, FaDownload, FaUser, FaVideo, FaClock, FaFileAlt, FaSearch, FaComment } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const submissionsData = [
  {
    id: 1,
    userId: "USR001",
    userName: "Rajib Ahmed",
    userEmail: "rajib@gmail.com",
    userPhone: "01712345678",
    level: 1,
    videoNumber: 1,
    videoTitle: "Introduction to Courses",
    status: "pending",
    submittedAt: "2024-01-20 10:30 AM",
    fileName: "assignment_1.pdf",
    fileSize: "2.5 MB",
    fileType: "pdf"
  },
  {
    id: 2,
    userId: "USR002",
    userName: "Fatima Khan",
    userEmail: "fatima@gmail.com",
    userPhone: "01812345679",
    level: 1,
    videoNumber: 2,
    videoTitle: "Getting Started",
    status: "pending",
    submittedAt: "2024-01-20 11:15 AM",
    fileName: "assignment_2.docx",
    fileSize: "1.8 MB",
    fileType: "docx"
  },
  {
    id: 3,
    userId: "USR003",
    userName: "Hasan Ali",
    userEmail: "hasan@gmail.com",
    userPhone: "01912345680",
    level: 1,
    videoNumber: 3,
    videoTitle: "Basic Concepts",
    status: "approved",
    submittedAt: "2024-01-19 09:45 AM",
    fileName: "assignment_3.pdf",
    fileSize: "3.2 MB",
    fileType: "pdf",
    approvedAt: "2024-01-19 02:30 PM",
    approvedBy: "Admin"
  },
  {
    id: 4,
    userId: "USR001",
    userName: "Rajib Ahmed",
    userEmail: "rajib@gmail.com",
    userPhone: "01712345678",
    level: 1,
    videoNumber: 2,
    videoTitle: "Getting Started",
    status: "rejected",
    submittedAt: "2024-01-18 03:20 PM",
    fileName: "assignment_rejected.pdf",
    fileSize: "2.1 MB",
    fileType: "pdf",
    rejectedAt: "2024-01-18 05:00 PM",
    rejectionReason: "Assignment is incomplete. Please resubmit with all required sections."
  },
  {
    id: 5,
    userId: "USR004",
    userName: "Shahnaz Begum",
    userEmail: "shahnaz@gmail.com",
    userPhone: "01612345681",
    level: 2,
    videoNumber: 6,
    videoTitle: "Advanced Techniques",
    status: "pending",
    submittedAt: "2024-01-20 02:50 PM",
    fileName: "level2_assignment.pdf",
    fileSize: "4.1 MB",
    fileType: "pdf"
  },
  {
    id: 6,
    userId: "USR005",
    userName: "Karim Hassan",
    userEmail: "karim@gmail.com",
    userPhone: "01512345682",
    level: 1,
    videoNumber: 4,
    videoTitle: "First Project",
    status: "approved",
    submittedAt: "2024-01-19 12:10 PM",
    fileName: "project_submission.zip",
    fileSize: "5.8 MB",
    fileType: "zip",
    approvedAt: "2024-01-19 03:45 PM",
    approvedBy: "Admin"
  }
];

function SubmissionCard({ submission, onApprove, onReject, onViewDetails }) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-gradient-to-r from-yellow-100 to-yellow-50', text: 'text-yellow-600', label: 'Pending', border: 'border-yellow-200' },
      approved: { bg: 'bg-gradient-to-r from-green-100 to-green-50', text: 'text-green-600', label: 'Approved', border: 'border-green-200' },
      rejected: { bg: 'bg-gradient-to-r from-red-100 to-red-50', text: 'text-red-600', label: 'Rejected', border: 'border-red-200' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-bold ${config.bg} ${config.text} border ${config.border}`}>
        {config.label}
      </span>
    );
  };

  const getFileIcon = (fileType) => {
    return <FaFileAlt className="text-lg md:text-2xl" />;
  };

  return (
    <div className="bg-white/60 backdrop-filter backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-bold text-white text-xs md:text-sm flex-shrink-0">
              {submission.userName.split(' ').map(w => w[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-sm md:text-base">{submission.userName}</h3>
              <p className="text-xs md:text-sm text-gray-600 truncate">{submission.userEmail}</p>
              <p className="text-xs text-gray-500 mt-1">{submission.userPhone}</p>
            </div>
          </div>
          {getStatusBadge(submission.status)}
        </div>

        {/* Video Info */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-3 md:p-4 border border-blue-200">
          <p className="text-xs md:text-sm font-bold text-blue-700 uppercase tracking-widest mb-2">Video Assignment</p>
          <div className="space-y-2 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <FaVideo className="text-blue-600 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-600">Level {submission.level}, Video {submission.videoNumber}</p>
                <p className="font-bold text-gray-900 truncate">{submission.videoTitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* File Info */}
        <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-3 md:p-4 border border-purple-200">
          <p className="text-xs md:text-sm font-bold text-purple-700 uppercase tracking-widest mb-2">Submitted File</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
              {getFileIcon(submission.fileType)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 text-xs md:text-sm truncate">{submission.fileName}</p>
              <p className="text-xs text-gray-600">{submission.fileSize}</p>
            </div>
          </div>
        </div>

        {/* Submitted Time */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
          <FaClock size={14} />
          <span>Submitted: {submission.submittedAt}</span>
        </div>

        {/* Status Info */}
        {submission.status === 'approved' && (
          <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-3 md:p-4 border border-green-200">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <FaCheck className="text-green-600 flex-shrink-0" />
              <div>
                <p className="text-green-700 font-bold">Approved on {submission.approvedAt}</p>
              </div>
            </div>
          </div>
        )}

        {submission.status === 'rejected' && (
          <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-3 md:p-4 border border-red-200">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FaTimes className="text-red-600 flex-shrink-0" />
                <p className="text-red-700 font-bold text-xs md:text-sm">Rejected on {submission.rejectedAt}</p>
              </div>
              <p className="text-red-700 text-xs md:text-sm bg-red-100/50 rounded-lg p-2">{submission.rejectionReason}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        {submission.status === 'pending' && (
          <div className="flex gap-2">
            <button
              onClick={() => onApprove(submission.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 md:py-2.5 bg-gradient-to-r from-green-400 to-green-500 hover:shadow-lg text-white rounded-lg md:rounded-xl font-bold transition-all duration-300 text-xs md:text-sm"
            >
              <FaCheck size={14} /> Approve
            </button>
            <button
              onClick={() => onReject(submission.id)}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 md:py-2.5 bg-gradient-to-r from-red-400 to-red-500 hover:shadow-lg text-white rounded-lg md:rounded-xl font-bold transition-all duration-300 text-xs md:text-sm"
            >
              <FaTimes size={14} /> Reject
            </button>
            <button
              onClick={() => onViewDetails(submission.id)}
              className="flex items-center justify-center px-3 py-2 md:py-2.5 bg-gradient-to-r from-blue-400 to-blue-500 hover:shadow-lg text-white rounded-lg md:rounded-xl font-bold transition-all duration-300"
            >
              <FaDownload size={14} />
            </button>
          </div>
        )}

        {submission.status !== 'pending' && (
          <button
            onClick={() => onViewDetails(submission.id)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 bg-gray-100/50 hover:bg-gray-200/50 text-gray-700 rounded-lg md:rounded-xl font-bold transition-all duration-300 text-xs md:text-sm"
          >
            <FaDownload size={14} /> View File
          </button>
        )}
      </div>
    </div>
  );
}

function RejectModal({ submission, onClose, onConfirm }) {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) {
      alert("Please provide feedback");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirm(submission.id, feedback);
      setIsSubmitting(false);
      onClose();
      setFeedback("");
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white/95 backdrop-filter backdrop-blur-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/30 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 border-b border-gray-200 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Reject Submission</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition"
          >
            <MdClose size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-8 space-y-5">
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg sm:rounded-2xl p-4 md:p-6 border border-red-200">
            <p className="text-xs md:text-sm font-bold text-red-700 uppercase tracking-widest mb-2">Submission Info</p>
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">User:</span>
                <span className="font-bold text-gray-900">{submission.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Video:</span>
                <span className="font-bold text-gray-900">Level {submission.level}, Video {submission.videoNumber}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs md:text-sm font-bold text-gray-700 block">
              Rejection Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide clear feedback about why this submission was rejected and what the user needs to fix..."
              className="w-full px-4 py-3 rounded-lg md:rounded-xl border border-gray-200 focus:border-[#FFEE57] focus:ring-2 focus:ring-[#FFEE57]/20 outline-none text-sm resize-none h-24"
            />
            <p className="text-xs text-gray-500">This message will be sent to the user</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 md:py-3 bg-gray-200/50 hover:bg-gray-300/50 text-gray-900 rounded-lg md:rounded-xl font-bold transition-all duration-300 text-xs md:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!feedback.trim() || isSubmitting}
              className="flex-1 px-4 py-2 md:py-3 bg-gradient-to-r from-red-400 to-red-500 hover:shadow-lg text-white rounded-lg md:rounded-xl font-bold transition-all duration-300 disabled:opacity-50 text-xs md:text-base"
            >
              {isSubmitting ? "Rejecting..." : "Confirm Rejection"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminSubmissionsComponent() {
  const [submissions, setSubmissions] = useState(submissionsData);
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [rejectingSubmission, setRejectingSubmission] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const filtered = submissions.filter((submission) => {
    const matchesTab = submission.status === activeTab;
    const matchesSearch = 
      submission.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.userPhone.includes(searchTerm) ||
      submission.videoTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleApprove = (id) => {
    const confirmed = window.confirm("আপনি কি এই assignment approve করতে চান?");
    if (confirmed) {
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === id
            ? {
                ...sub,
                status: "approved",
                approvedAt: new Date().toLocaleString(),
                approvedBy: "Admin"
              }
            : sub
        )
      );
      alert("Assignment approved successfully!");
    }
  };

  const handleReject = (id) => {
    const submission = submissions.find((s) => s.id === id);
    setRejectingSubmission(submission);
  };

  const handleConfirmReject = (id, feedback) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id
          ? {
              ...sub,
              status: "rejected",
              rejectedAt: new Date().toLocaleString(),
              rejectionReason: feedback
            }
          : sub
      )
    );
    alert("Assignment rejected and user notified!");
  };

  const pendingCount = submissions.filter((s) => s.status === "pending").length;
  const approvedCount = submissions.filter((s) => s.status === "approved").length;
  const rejectedCount = submissions.filter((s) => s.status === "rejected").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-3 sm:p-6 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        * { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2 sm:p-3 rounded-lg sm:rounded-2xl bg-gradient-to-br from-[#FFEE57] to-yellow-400 shadow-lg flex-shrink-0">
            <FaFileAlt className="text-gray-800 text-xl sm:text-3xl" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Submissions Review</h1>
            <p className="text-gray-600 text-xs sm:text-base mt-1 sm:mt-2">Review and manage student assignments</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <StatCard
          label="Pending"
          count={pendingCount}
          gradient="from-yellow-400 to-yellow-600"
        />
        <StatCard
          label="Approved"
          count={approvedCount}
          gradient="from-green-400 to-green-600"
        />
        <StatCard
          label="Rejected"
          count={rejectedCount}
          gradient="from-red-400 to-red-600"
        />
      </div>

      {/* Search */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3 bg-white/60 backdrop-filter backdrop-blur-lg rounded-lg sm:rounded-2xl px-3 sm:px-6 py-2.5 sm:py-3 border border-white/20 shadow-lg">
          <FaSearch className="text-gray-400 text-base sm:text-lg flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name, email, phone or video..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs sm:text-base text-gray-700 w-full placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 bg-white/40 backdrop-filter backdrop-blur-lg rounded-xl sm:rounded-2xl p-2 w-full sm:w-fit">
        {["pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold transition-all duration-300 whitespace-nowrap text-xs sm:text-base flex-shrink-0 ${
              activeTab === tab
                ? `bg-gradient-to-r ${
                    tab === "pending"
                      ? "from-yellow-400 to-yellow-500"
                      : tab === "approved"
                      ? "from-green-400 to-green-500"
                      : "from-red-400 to-red-500"
                  } text-white shadow-lg scale-105`
                : "text-gray-700 hover:bg-white/50"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tab === "pending" ? pendingCount : tab === "approved" ? approvedCount : rejectedCount})
          </button>
        ))}
      </div>

      {/* Submissions */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 sm:py-20">
          <FaFileAlt size={50} className="mx-auto mb-3 text-gray-300 sm:size-60" />
          <p className="text-gray-600 text-sm sm:text-lg font-medium">No submissions found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {filtered.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onApprove={handleApprove}
              onReject={handleReject}
              onViewDetails={(id) => setSelectedSubmission(submissions.find((s) => s.id === id))}
            />
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectingSubmission && (
        <RejectModal
          submission={rejectingSubmission}
          onClose={() => setRejectingSubmission(null)}
          onConfirm={handleConfirmReject}
        />
      )}

      {/* File Preview Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white/95 backdrop-filter backdrop-blur-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-white/30 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 border-b border-gray-200 flex justify-between items-center rounded-t-3xl">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">File Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 hover:bg-white rounded-lg transition"
              >
                <MdClose size={20} />
              </button>
            </div>

            <div className="p-4 sm:p-6 md:p-8 space-y-5">
              {/* User Info */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg sm:rounded-2xl p-4 md:p-6 border border-blue-200">
                <p className="text-xs md:text-sm font-bold text-blue-700 uppercase tracking-widest mb-3">User Information</p>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-bold text-gray-900">{selectedSubmission.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-bold text-gray-900 truncate">{selectedSubmission.userEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-bold text-gray-900">{selectedSubmission.userPhone}</span>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg sm:rounded-2xl p-4 md:p-6 border border-purple-200">
                <p className="text-xs md:text-sm font-bold text-purple-700 uppercase tracking-widest mb-3">Video Information</p>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-bold text-gray-900">{selectedSubmission.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Video:</span>
                    <span className="font-bold text-gray-900">{selectedSubmission.videoNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Title:</span>
                    <span className="font-bold text-gray-900">{selectedSubmission.videoTitle}</span>
                  </div>
                </div>
              </div>

              {/* File Info */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg sm:rounded-2xl p-4 md:p-6 border border-orange-200">
                <p className="text-xs md:text-sm font-bold text-orange-700 uppercase tracking-widest mb-3">File Information</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white flex-shrink-0">
                    <FaFileAlt size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-xs md:text-sm truncate">{selectedSubmission.fileName}</p>
                    <p className="text-xs text-gray-600">{selectedSubmission.fileSize}</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Submitted:</span>
                    <span className="font-bold text-gray-900">{selectedSubmission.submittedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-bold text-gray-900 uppercase">{selectedSubmission.fileType}</span>
                  </div>
                </div>
              </div>

              {/* File Preview Placeholder */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg sm:rounded-2xl p-6 md:p-8 border-2 border-dashed border-gray-300 text-center">
                <FaFileAlt className="text-5xl text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm md:text-base font-medium mb-4">
                  {selectedSubmission.fileName}
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("File download initiated: " + selectedSubmission.fileName);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300 text-xs md:text-sm"
                >
                  <FaDownload size={14} /> Download File
                </a>
              </div>

              {/* Status Info */}
              {selectedSubmission.status === "approved" && (
                <div className="bg-gradient-to-br from-green-50 to-white rounded-lg sm:rounded-2xl p-4 md:p-6 border border-green-200">
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-600 text-lg flex-shrink-0" />
                    <div>
                      <p className="text-green-700 font-bold text-xs md:text-sm">Approved</p>
                      <p className="text-green-600 text-xs">{selectedSubmission.approvedAt}</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubmission.status === "rejected" && (
                <div className="bg-gradient-to-br from-red-50 to-white rounded-lg sm:rounded-2xl p-4 md:p-6 border border-red-200">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaTimes className="text-red-600 text-lg flex-shrink-0" />
                      <p className="text-red-700 font-bold text-xs md:text-sm">Rejected</p>
                    </div>
                    <p className="text-red-600 text-xs">{selectedSubmission.rejectedAt}</p>
                    <div className="bg-red-100/50 rounded-lg p-3 mt-2">
                      <p className="text-red-700 text-xs md:text-sm">{selectedSubmission.rejectionReason}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedSubmission(null)}
                className="w-full px-4 py-2 md:py-3 bg-gray-200/50 hover:bg-gray-300/50 text-gray-900 rounded-lg md:rounded-xl font-bold transition-all duration-300 text-xs md:text-base"
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

function StatCard({ label, count, gradient }) {
  return (
    <div className="bg-white/60 backdrop-filter backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 md:p-5 shadow-lg border border-white/20">
      <p className="text-gray-600 text-xs md:text-sm font-bold uppercase tracking-widest mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <h3 className="text-2xl md:text-3xl font-black text-gray-900">{count}</h3>
        <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br ${gradient} shadow-lg flex-shrink-0`}>
          <FaFileAlt className="text-white text-base md:text-lg" />
        </div>
      </div>
    </div>
  );
}