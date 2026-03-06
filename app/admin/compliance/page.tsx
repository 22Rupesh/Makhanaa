'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Calendar, FileText, Download, Trash2, Upload, X } from 'lucide-react';

export default function AdminCompliancePage() {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadForm, setUploadForm] = useState({
        name: '',
        type: '',
        issueDate: '',
        expiryDate: '',
        batchNumber: 'N/A',
        status: 'Valid',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await fetch('/api/documents');
            const data = await response.json();
            if (data.success) {
                setDocuments(data.documents);
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !uploadForm.name || !uploadForm.type || !uploadForm.issueDate) {
            alert('Please fill in all required fields and select a file');
            return;
        }

        setUploading(true);

        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Data = reader.result as string;

                const response = await fetch('/api/documents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...uploadForm,
                        fileData: base64Data,
                        fileName: selectedFile.name,
                        fileType: selectedFile.type,
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    alert('✅ Document uploaded successfully!');
                    setShowUploadModal(false);
                    setUploadForm({
                        name: '',
                        type: '',
                        issueDate: '',
                        expiryDate: '',
                        batchNumber: 'N/A',
                        status: 'Valid',
                    });
                    setSelectedFile(null);
                    fetchDocuments();
                } else {
                    alert('❌ Failed to upload document: ' + data.message);
                }
            };

            reader.readAsDataURL(selectedFile);
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('❌ An error occurred while uploading');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/documents/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                alert('✅ Document deleted successfully!');
                fetchDocuments();
            } else {
                alert('❌ Failed to delete document: ' + data.message);
            }
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('❌ An error occurred while deleting');
        }
    };

    const handleDownload = (doc: any) => {
        const link = document.createElement('a');
        link.href = doc.fileData;
        link.download = doc.fileName;
        link.click();
    };

    const filteredDocs = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || doc.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const uniqueTypes = Array.from(new Set(documents.map(doc => doc.type)));

    const stats = {
        total: documents.length,
        valid: documents.filter(d => d.status === 'Valid').length,
        latest: documents.filter(d => d.status === 'Latest').length,
    };

    return (
        <div className="lg:ml-64 p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-[#2C2C2C] mb-2 font-serif">
                        Compliance Documents
                    </h1>
                    <p className="text-[#666666]">
                        Manage FDA, HACCP, ISO, and lab reports
                    </p>
                </div>
                <button
                    onClick={() => setShowUploadModal(true)}
                    className="bg-[#2D5F3F] hover:bg-[#1f4428] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
                >
                    <Plus size={20} />
                    Add Document
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-[#E5DDD5]">
                    <h3 className="text-[#666666] text-sm font-semibold mb-2">Total Documents</h3>
                    <p className="text-3xl font-bold text-[#2D5F3F]">{stats.total}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#E5DDD5]">
                    <h3 className="text-[#666666] text-sm font-semibold mb-2">Valid Certificates</h3>
                    <p className="text-3xl font-bold text-[#2D5F3F]">{stats.valid}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-[#E5DDD5]">
                    <h3 className="text-[#666666] text-sm font-semibold mb-2">Latest Reports</h3>
                    <p className="text-3xl font-bold text-[#2D5F3F]">{stats.latest}</p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg p-6 mb-8 border border-[#E5DDD5]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-[#D4A574]" size={20} />
                        <input
                            type="text"
                            placeholder="Search by document name or batch #..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#D4A574]"
                        />
                    </div>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-4 py-2 border border-[#E5DDD5] rounded-lg focus:outline-none focus:border-[#D4A574]"
                    >
                        <option value="all">All Document Types</option>
                        {uniqueTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <p className="text-sm text-[#666666] mt-4">
                    Showing {filteredDocs.length} of {documents.length} documents
                </p>
            </div>

            {/* Documents Table */}
            <div className="bg-white rounded-lg border border-[#E5DDD5] overflow-hidden">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2D5F3F]"></div>
                        <p className="text-[#666666] mt-4">Loading documents...</p>
                    </div>
                ) : filteredDocs.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="mx-auto mb-4 text-[#D4A574]" size={48} />
                        <p className="text-[#666666] mb-4">No documents found</p>
                        <button
                            onClick={() => setShowUploadModal(true)}
                            className="bg-[#2D5F3F] hover:bg-[#1f4428] text-white px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Upload First Document
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#FAF8F5] border-b border-[#E5DDD5]">
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Document Name</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Type</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Issue Date</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Expiry Date</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Batch #</th>
                                    <th className="px-6 py-4 text-left text-[#2C2C2C] font-bold">Status</th>
                                    <th className="px-6 py-4 text-center text-[#2C2C2C] font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDocs.map((doc, idx) => (
                                    <tr key={doc._id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                                        <td className="px-6 py-4 text-[#2C2C2C] font-semibold">{doc.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-semibold bg-[#A8D5BA]/20 text-[#2D5F3F] px-3 py-1 rounded-full">
                                                {doc.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-[#666666] text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-[#D4A574]" />
                                                {new Date(doc.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[#666666] text-sm">
                                            {!doc.expiryDate || doc.expiryDate === 'N/A' ? (
                                                <span className="text-[#D4A574] font-semibold">N/A</span>
                                            ) : (
                                                new Date(doc.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-[#2C2C2C] font-mono text-sm">{doc.batchNumber}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full ${doc.status === 'Valid'
                                                    ? 'bg-[#A8D5BA]/20 text-[#2D5F3F]'
                                                    : 'bg-[#D4A574]/20 text-[#D4A574]'
                                                }`}>
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleDownload(doc)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition bg-[#D4A574] hover:bg-[#c09660] text-white text-sm"
                                                >
                                                    <Download size={16} />
                                                    Download
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(doc._id, doc.name)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition bg-red-600 hover:bg-red-700 text-white text-sm"
                                                >
                                                    <Trash2 size={16} />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#E5DDD5] flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-[#2C2C2C] font-serif">Upload New Document</h2>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="text-[#666666] hover:text-[#2C2C2C]"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-[#2C2C2C] font-semibold mb-2">Document Name *</label>
                                <input
                                    type="text"
                                    value={uploadForm.name}
                                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                                    placeholder="e.g., FDA Registration Certificate"
                                    className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                                />
                            </div>

                            <div>
                                <label className="block text-[#2C2C2C] font-semibold mb-2">Document Type *</label>
                                <select
                                    value={uploadForm.type}
                                    onChange={(e) => setUploadForm({ ...uploadForm, type: e.target.value })}
                                    className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                                >
                                    <option value="">Select Type</option>
                                    <option value="FDA Compliance">FDA Compliance</option>
                                    <option value="Food Safety">Food Safety</option>
                                    <option value="Quality Management">Quality Management</option>
                                    <option value="Lab Report">Lab Report</option>
                                    <option value="Organic">Organic</option>
                                    <option value="Social Responsibility">Social Responsibility</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[#2C2C2C] font-semibold mb-2">Issue Date *</label>
                                    <input
                                        type="date"
                                        value={uploadForm.issueDate}
                                        onChange={(e) => setUploadForm({ ...uploadForm, issueDate: e.target.value })}
                                        className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#2C2C2C] font-semibold mb-2">Expiry Date</label>
                                    <input
                                        type="date"
                                        value={uploadForm.expiryDate}
                                        onChange={(e) => setUploadForm({ ...uploadForm, expiryDate: e.target.value })}
                                        className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#2C2C2C] font-semibold mb-2">Batch Number</label>
                                <input
                                    type="text"
                                    value={uploadForm.batchNumber}
                                    onChange={(e) => setUploadForm({ ...uploadForm, batchNumber: e.target.value })}
                                    placeholder="e.g., BATCH-2026-001"
                                    className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                                />
                            </div>

                            <div>
                                <label className="block text-[#2C2C2C] font-semibold mb-2">Status</label>
                                <select
                                    value={uploadForm.status}
                                    onChange={(e) => setUploadForm({ ...uploadForm, status: e.target.value })}
                                    className="w-full border border-[#E5DDD5] rounded-lg px-4 py-2 focus:outline-none focus:border-[#D4A574]"
                                >
                                    <option value="Valid">Valid</option>
                                    <option value="Latest">Latest</option>
                                    <option value="Expired">Expired</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[#2C2C2C] font-semibold mb-2">Upload File *</label>
                                <div className="border-2 border-dashed border-[#E5DDD5] rounded-lg p-6 text-center">
                                    <Upload className="mx-auto mb-2 text-[#D4A574]" size={32} />
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer text-[#2D5F3F] font-semibold hover:text-[#1f4428]"
                                    >
                                        Click to upload
                                    </label>
                                    <p className="text-sm text-[#666666] mt-2">
                                        PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                                    </p>
                                    {selectedFile && (
                                        <p className="text-sm text-[#2D5F3F] mt-2 font-semibold">
                                            Selected: {selectedFile.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-[#E5DDD5] flex gap-4">
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="flex-1 border-2 border-[#E5DDD5] text-[#2C2C2C] py-3 rounded-lg font-semibold hover:border-[#2D5F3F] transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="flex-1 bg-[#2D5F3F] hover:bg-[#1f4428] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition"
                            >
                                {uploading ? 'Uploading...' : 'Upload Document'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
