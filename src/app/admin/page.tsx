'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import TemplateEditor from '@/components/TemplateEditor';
import { DesignConfig } from '@/lib/designs';

interface TemplateWithThumb extends DesignConfig {
  thumbnailColor?: string;
  thumbnailIcon?: string;
}

export default function AdminPage() {
  const [templates, setTemplates] = useState<TemplateWithThumb[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<DesignConfig | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/templates');
      const data = await response.json();
      
      if (data.success) {
        // Add visual properties for display
        const templatesWithThumb = data.templates.map((t: DesignConfig) => ({
          ...t,
          thumbnailColor: t.id.includes('anniversary') ? '#FFD700' 
            : t.id.includes('romantic') ? '#FF69B4'
            : t.id.includes('classic') ? '#333333'
            : '#667eea',
          thumbnailIcon: t.id.includes('anniversary') ? 'star'
            : t.id.includes('romantic') ? 'heart'
            : t.id.includes('classic') ? 'frame'
            : 'celebration',
        }));
        setTemplates(templatesWithThumb);
      } else {
        setError('Failed to load templates');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  const handleAddNew = () => {
    setEditingTemplate(null);
    setShowEditor(true);
  };

  const handleEdit = (template: DesignConfig) => {
    setEditingTemplate(template);
    setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/templates?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        setTemplates(prev => prev.filter(t => t.id !== id));
      } else {
        alert(data.error || 'Failed to delete template');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSave = async (template: DesignConfig) => {
    try {
      const response = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template }),
      });
      const data = await response.json();

      if (data.success) {
        // Refresh templates
        await fetchTemplates();
        setShowEditor(false);
        setEditingTemplate(null);
      } else {
        alert(data.error || 'Failed to save template');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 50%, #FFFFFF 100%)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3">
                <img src="/icon-192.png" alt="Dannion Creative Hub Logo" className="w-10 h-10 rounded-xl object-contain shadow-md" />
                <div>
                  <h1 className="text-gray-800 font-bold text-lg leading-tight">Dannion DP Generator</h1>
                  <p className="text-gray-500 text-xs">Admin Dashboard</p>
                </div>
              </Link>
            </div>
            {/* Navigation */}
            <nav className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors">
                ← Back to Generator
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Template Management</h2>
            <p className="text-gray-500 mt-1">Manage your DP design templates</p>
          </div>
          <button onClick={handleAddNew} className="primary-btn">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Template
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200 animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-xl mb-4" />
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Templates Grid */}
        {!loading && templates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-gray-800 font-semibold text-lg mb-1">No Templates Yet</h3>
            <p className="text-gray-500 mb-4">Create your first design template to get started</p>
            <button onClick={handleAddNew} className="primary-btn">
              Create First Template
            </button>
          </div>
        )}

        {!loading && templates.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div 
                key={template.id}
                className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#0070F4]/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Thumbnail Preview */}
                <div 
                  className="aspect-video rounded-xl mb-4 overflow-hidden relative"
                  style={{ background: `linear-gradient(135deg, ${template.thumbnailColor} 0%, ${template.thumbnailColor}cc 100%)` }}
                >
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-4 border-2 border-white/50 rounded-xl" />
                    <div className="absolute inset-8 border border-white/30 rounded-lg" />
                  </div>
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {template.thumbnailIcon === 'star' && (
                      <svg className="w-12 h-12 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    )}
                    {template.thumbnailIcon === 'heart' && (
                      <svg className="w-12 h-12 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    )}
                    {template.thumbnailIcon === 'frame' && (
                      <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {template.thumbnailIcon === 'celebration' && (
                      <svg className="w-12 h-12 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.5 2.5c0 1.5-1.5 3.5-1.5 5.5 0 1 .5 2 1.5 3l6 6c1 1 1 2 0 3l-2 2c-1 1-2 1-3 0l-6-6c-1-1-2-1.5-3-1.5-2 0-4 1.5-5.5 1.5S1 14 1 15.5c0 2.5 2 4 4 4h11c2 0 4-1.5 4-4 0-1.5-1-3-2.5-4-.5-.5-1.5-1.5-1.5-3z"/>
                      </svg>
                    )}
                  </div>
                </div>

                {/* Template Info */}
                <h3 className="text-gray-800 font-semibold text-base mb-1 truncate">{template.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{template.description}</p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(template)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    disabled={deletingId === template.id}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    {deletingId === template.id ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Template Editor Modal */}
      {showEditor && (
        <TemplateEditor
          template={editingTemplate || undefined}
          onSave={handleSave}
          onCancel={() => {
            setShowEditor(false);
            setEditingTemplate(null);
          }}
        />
      )}
    </main>
  );
}