'use client';

import { DesignConfig } from '@/lib/designs';

interface TemplateEditorProps {
  template?: DesignConfig;
  onSave: (template: DesignConfig) => void;
  onCancel: () => void;
}

export default function TemplateEditor({ template, onSave, onCancel }: TemplateEditorProps) {
  const isEditing = !!template;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedTemplate: DesignConfig = {
      id: template?.id || `template-${Date.now()}`,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
      photoPosition: {
        x: parseInt(formData.get('photoX') as string) || 100,
        y: parseInt(formData.get('photoY') as string) || 100,
        width: parseInt(formData.get('photoWidth') as string) || 300,
        height: parseInt(formData.get('photoHeight') as string) || 300,
      },
      namePosition: {
        x: parseInt(formData.get('nameX') as string) || 250,
        y: parseInt(formData.get('nameY') as string) || 600,
        fontSize: parseInt(formData.get('fontSize') as string) || 24,
        color: formData.get('fontColor') as string || '#FFFFFF',
        fontFamily: formData.get('fontFamily') as string || 'Poppins',
      },
    };

    onSave(updatedTemplate);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edit Template' : 'Add New Template'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isEditing ? 'Update template details' : 'Create a new design template'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Template Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={template?.name}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0070F4] focus:border-[#0070F4] outline-none transition-all"
              placeholder="e.g., Anniversary Gold"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={template?.description}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0070F4] focus:border-[#0070F4] outline-none transition-all resize-none"
              placeholder="Brief description of this template"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Template Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              defaultValue={template?.image}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0070F4] focus:border-[#0070F4] outline-none transition-all"
              placeholder="/designs/template-name.png"
            />
          </div>

          {/* Photo Position Section */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            <h3 className="font-semibold text-gray-800">Photo Placement Zone</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="photoX" className="block text-xs font-medium text-gray-600 mb-1">X Position</label>
                <input
                  type="number"
                  id="photoX"
                  name="photoX"
                  defaultValue={template?.photoPosition.x ?? 100}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070F4] outline-none"
                />
              </div>
              <div>
                <label htmlFor="photoY" className="block text-xs font-medium text-gray-600 mb-1">Y Position</label>
                <input
                  type="number"
                  id="photoY"
                  name="photoY"
                  defaultValue={template?.photoPosition.y ?? 100}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070F4] outline-none"
                />
              </div>
              <div>
                <label htmlFor="photoWidth" className="block text-xs font-medium text-gray-600 mb-1">Width</label>
                <input
                  type="number"
                  id="photoWidth"
                  name="photoWidth"
                  defaultValue={template?.photoPosition.width ?? 300}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070F4] outline-none"
                />
              </div>
              <div>
                <label htmlFor="photoHeight" className="block text-xs font-medium text-gray-600 mb-1">Height</label>
                <input
                  type="number"
                  id="photoHeight"
                  name="photoHeight"
                  defaultValue={template?.photoPosition.height ?? 300}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070F4] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Name Position Section */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            <h3 className="font-semibold text-gray-800">Name Text Placement</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="nameX" className="block text-xs font-medium text-gray-600 mb-1">X Position</label>
                <input
                  type="number"
                  id="nameX"
                  name="nameX"
                  defaultValue={template?.namePosition.x ?? 250}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070F4] outline-none"
                />
              </div>
              <div>
                <label htmlFor="nameY" className="block text-xs font-medium text-gray-600 mb-1">Y Position</label>
                <input
                  type="number"
                  id="nameY"
                  name="nameY"
                  defaultValue={template?.namePosition.y ?? 600}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070F4] outline-none"
                />
              </div>
              <div>
                <label htmlFor="fontSize" className="block text-xs font-medium text-gray-600 mb-1">Font Size</label>
                <input
                  type="number"
                  id="fontSize"
                  name="fontSize"
                  defaultValue={template?.namePosition.fontSize ?? 24}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070F4] outline-none"
                />
              </div>
              <div>
                <label htmlFor="fontColor" className="block text-xs font-medium text-gray-600 mb-1">Font Color</label>
                <input
                  type="text"
                  id="fontColor"
                  name="fontColor"
                  defaultValue={template?.namePosition.color ?? '#FFFFFF'}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070F4] outline-none"
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
            <div>
              <label htmlFor="fontFamily" className="block text-xs font-medium text-gray-600 mb-1">Font Family</label>
              <input
                type="text"
                id="fontFamily"
                name="fontFamily"
                defaultValue={template?.namePosition.fontFamily ?? 'Poppins'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0070F4] outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 outline-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 primary-btn"
            >
              {isEditing ? 'Save Changes' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}