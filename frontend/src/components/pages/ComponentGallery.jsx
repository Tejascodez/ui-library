import React, { useState, useEffect } from 'react';
import { Copy, Check, ChevronDown, ChevronRight, Code, Terminal, Package, Video } from 'lucide-react';

const ComponentGallery = () => {
  // ... [keep previous state and effects unchanged]
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedComponent, setExpandedComponent] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [copiedStates, setCopiedStates] = useState({});

  // Fetch components on component mount
 // Fetch components on component mount
useEffect(() => {
    const fetchComponents = async () => {
      setLoading(true);  // Set loading to true at the start of fetch
      try {
        const response = await fetch('http://localhost:3000/api/components');
  
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
  
        const data = await response.json();
  
        // Check if 'components' array is present in the response
        if (data && Array.isArray(data)) {
          setComponents(data);  // Directly set the fetched components
        } else {
          setError('Failed to fetch components: No valid data returned');
        }
      } catch (err) {
        setError('Error fetching components: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchComponents();
  }, []);
  
  // Toggle component expansion
  const toggleComponent = (componentId) => {
    setExpandedComponent(expandedComponent === componentId ? null : componentId);
    
    // Initialize expanded sections for this component if not already done
    if (!expandedSections[componentId]) {
      setExpandedSections(prev => ({
        ...prev,
        [componentId]: { installation: true, utilFile: true, sourceCode: true, cli: true }
      }));
    }
  };

  // Toggle section expansion
  const toggleSection = (componentId, section) => {
    setExpandedSections(prev => ({
      ...prev,
      [componentId]: {
        ...prev[componentId],
        [section]: !prev[componentId]?.[section]
      }
    }));
  };

  // Handle copy functionality
  const handleCopy = (componentId, content, section) => {
    navigator.clipboard.writeText(content);
    
    setCopiedStates(prev => ({
      ...prev,
      [`${componentId}-${section}`]: true
    }));
    
    setTimeout(() => {
      setCopiedStates(prev => ({
        ...prev,
        [`${componentId}-${section}`]: false
      }));
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  if (components.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
        <p>No components found. Add some components to see them here.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Component Library
      </h1>

      <div className="grid grid-cols-1 gap-6 md:gap-8">
        {components.map((component) => (
          <div 
            key={component._id} 
            className="border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            {/* Component Header */}
            <div 
              className="bg-gray-50 dark:bg-gray-800 px-6 py-4 flex justify-between items-center cursor-pointer transition-colors"
              onClick={() => toggleComponent(component._id)}
            >
              <div className="flex items-center space-x-4">
                <div className="text-gray-500">
                  {expandedComponent === component._id ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {component.componentHeading}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {component.componentName}
                  </p>
                </div>
              </div>
              
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(component.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            {/* Component Details */}
            {expandedComponent === component._id && (
              <div className="p-6 space-y-8 border-t border-gray-100 dark:border-gray-800">
                {/* Installation Section */}
                <div className="space-y-4">
                  <SectionHeader 
                    icon={<Package size={18} className="text-blue-500" />}
                    title="Installation"
                    isExpanded={expandedSections[component._id]?.installation}
                    onToggle={() => toggleSection(component._id, 'installation')}
                  />
                  
                  {expandedSections[component._id]?.installation && (
                    <CodeBlock
                      content={component.installation}
                      onCopy={() => handleCopy(component._id, component.installation, 'installation')}
                      isCopied={copiedStates[`${component._id}-installation`]}
                    />
                  )}
                </div>

                {/* CLI Commands Section */}
                {component.cli && component.cli.length > 0 && (
                  <div className="space-y-4">
                    <SectionHeader
                      icon={<Terminal size={18} className="text-green-500" />}
                      title="CLI Commands"
                      isExpanded={expandedSections[component._id]?.cli}
                      onToggle={() => toggleSection(component._id, 'cli')}
                    />
                    
                    {expandedSections[component._id]?.cli && (
                      <CodeBlock
                        content={component.cli.join('\n')}
                        onCopy={() => handleCopy(component._id, component.cli.join('\n'), 'cli')}
                        isCopied={copiedStates[`${component._id}-cli`]}
                      />
                    )}
                  </div>
                )}

                {/* Source Code Section */}
                <div className="space-y-4">
                  <SectionHeader
                    icon={<Code size={18} className="text-purple-500" />}
                    title="Source Code"
                    isExpanded={expandedSections[component._id]?.sourceCode}
                    onToggle={() => toggleSection(component._id, 'sourceCode')}
                  />
                  
                  {expandedSections[component._id]?.sourceCode && (
                    <CodeBlock
                      content={component.sourceCode}
                      onCopy={() => handleCopy(component._id, component.sourceCode, 'sourceCode')}
                      isCopied={copiedStates[`${component._id}-sourceCode`]}
                    />
                  )}
                </div>

                {/* Square Preview Section */}
                {component.previewVideo && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <Video size={18} className="text-red-500" />
                      <h3 className="font-medium">Preview</h3>
                    </div>
                    <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden shadow-lg">
                      <video
                        controls
                        className="absolute inset-0 w-full h-full object-contain"
                        src={component.previewVideo}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Extracted Section Header Component
const SectionHeader = ({ icon, title, isExpanded, onToggle }) => (
  <div 
    className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
    onClick={onToggle}
  >
    <div className="flex items-center space-x-2">
      {icon}
      <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
    </div>
    {isExpanded ? (
      <ChevronDown size={18} className="text-gray-500" />
    ) : (
      <ChevronRight size={18} className="text-gray-500" />
    )}
  </div>
);

// Extracted Code Block Component
const CodeBlock = ({ content, onCopy, isCopied }) => (
  <div className="relative group">
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
      {content}
    </pre>
    <button
      onClick={onCopy}
      className="absolute top-3 right-3 p-1.5 bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
      title="Copy to clipboard"
    >
      {isCopied ? (
        <Check size={16} className="text-green-400" />
      ) : (
        <Copy size={16} className="text-gray-300" />
      )}
    </button>
  </div>
);

export default ComponentGallery;