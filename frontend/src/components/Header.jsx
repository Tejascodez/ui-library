import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { toast } from 'react-toastify'; // Import toast

// Make sure to import the ToastContainer somewhere in your component tree
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      componentName: '',
      componentHeading: '',
      installation: '',
      utilFile: '',
      sourceCode: '',
      cli: [''],
      previewVideo: '',
    });
  
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);
  
    const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleCliChange = (index, value) => {
      const newCli = [...formData.cli];
      newCli[index] = value;
      setFormData({ ...formData, cli: newCli });
    };
  
    const addCliField = () => {
      setFormData({ ...formData, cli: [...formData.cli, ''] });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Send POST request to the API to save the component
          const response = await fetch('http://localhost:3000/api/components', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error('Failed to add component');
          }
    
          const data = await response.json();
          console.log('Component added:', data);
    
          // Show success toast
          toast.success('Component added successfully!');
    
          // Close the modal after successful submission
          setIsModalOpen(false);
    
          // Reset form
          setFormData({
            componentName: '',
            componentHeading: '',
            installation: '',
            utilFile: '',
            sourceCode: '',
            cli: [''],
            previewVideo: '',
          });
        } catch (err) {
          console.error('Submission error:', err);
          toast.error('Error adding component. Please try again.');
        }
      };
  return (
    <>
      {/* Header */}
      <header className="w-full px-6 py-4 bg-gradient-to-r from-neutral-900 to-neutral-800 border-b border-white/15 flex items-center justify-between shadow-md sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white tracking-tight">Component Dashboard</h1>
        <button
          onClick={handleModalToggle}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <Plus size={18} />
          Add Component
        </button>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 overflow-y-auto">
          <div 
            className="bg-gradient-to-b from-neutral-800 to-neutral-900 w-full max-w-2xl rounded-2xl p-8 relative shadow-2xl border border-white/15 transition-all duration-300 ease-in-out my-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleModalToggle}
              className="absolute top-4 right-4 text-white/70 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>

            <h2 className="text-3xl font-semibold mb-6 text-white border-b border-white/10 pb-3">Add New Component</h2>

            <form onSubmit={handleSubmit} className="space-y-5 text-white overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
              <div className="grid grid-cols-1 gap-5">
                <Input label="Component Name" name="componentName" value={formData.componentName} onChange={handleChange} required />
                <Input label="Component Heading" name="componentHeading" value={formData.componentHeading} onChange={handleChange} required />
                <Input label="Installation Command" name="installation" value={formData.installation} onChange={handleChange} required />
                <Textarea label="Utility File (raw text or URL)" name="utilFile" value={formData.utilFile} onChange={handleChange} />
                <Textarea label="Source Code" name="sourceCode" value={formData.sourceCode} onChange={handleChange} required rows={6} />
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/80 block">CLI Commands</label>
                  {formData.cli.map((command, index) => (
                    <input
                      key={index}
                      type="text"
                      value={command}
                      onChange={(e) => handleCliChange(index, e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-neutral-800/70 border border-white/15 focus:ring-2 ring-blue-500/50 focus:border-blue-400 transition-all duration-200"
                      placeholder={`Command #${index + 1}`}
                    />
                  ))}
                  <button
                    type="button"
                    onClick={addCliField}
                    className="mt-2 text-sm text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Another Command
                  </button>
                </div>

                <Input label="Preview Video URL" name="previewVideo" value={formData.previewVideo} onChange={handleChange} />
              </div>

              <div className="flex justify-end pt-4 border-t border-white/10 mt-6">
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="px-5 py-2 mr-3 rounded-md text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 shadow-lg transition-all duration-200 focus:ring-2 ring-blue-500/50"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global modal styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        @keyframes modal-appear {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}

const Input = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-white/80 block">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 rounded-md bg-neutral-800/70 border border-white/15 focus:ring-2 ring-blue-500/50 focus:border-blue-400 transition-all duration-200"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-white/80 block">{label}</label>
    <textarea
      {...props}
      className="w-full px-4 py-2 rounded-md bg-neutral-800/70 border border-white/15 focus:ring-2 ring-blue-500/50 focus:border-blue-400 transition-all duration-200 resize-vertical"
    />
  </div>
);