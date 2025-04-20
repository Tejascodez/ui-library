import React, { useState, useEffect } from 'react'; 
import { Copy, Menu, X, Check, ChevronRight, ChevronDown } from 'lucide-react';
import Header from '../Header';
import axios from 'axios';

const extractYouTubeId = (urlOrId) => {
  if (!urlOrId) return null;

  // If already a video ID, return it
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) return urlOrId;

  const match = urlOrId.match(
    /(?:v=|\/(embed|shorts)\/|\.be\/|\/watch\?v=)?([a-zA-Z0-9_-]{11})/
  );

  return match ? match[2] : null;
};

const ComponentPreview = ({ componentData }) => {
  const YouTubeEmbed = ({ videoId }) => {
    const extractedId = extractYouTubeId(videoId);
    console.log("Extracted ID:", extractedId);

    if (!extractedId) {
      return <div className="text-red-500">Invalid YouTube link</div>;
    }

    return (
      <div className="aspect-w-16 aspect-h-16 w-full h-full rounded-xl overflow-hidden shadow-lg bg-neutral-950 border border-neutral-800">
        <iframe
          src={`https://www.youtube.com/embed/${extractedId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-104"
        ></iframe>
      </div>
    );
  };

  if (!componentData) {
    return <div className="flex items-center justify-center h-64 bg-neutral-900 rounded-xl border border-neutral-800">
      <div className="animate-pulse flex space-x-2">
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-75"></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
      </div>
    </div>;
  }

  return <YouTubeEmbed videoId={componentData.previewVideo} />;
};

const CLIContent = ({ componentData }) => {
  const [copied, setCopied] = useState({});
  
  if (!componentData) return (
    <div className="flex items-center justify-center h-64 bg-neutral-900 rounded-xl border border-neutral-800">
      <div className="animate-pulse flex space-x-2">
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-75"></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
      </div>
    </div>
  );
  
  const handleCopy = (index, command) => {
    navigator.clipboard.writeText(command);
    setCopied({ ...copied, [index]: true });
    
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [index]: false }));
    }, 2000);
  };
  
  
  return (
    <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 shadow-lg">

      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-8 h-8 rounded-md flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="m4 17 6-6-6-6"></path>
            <path d="M12 5h8"></path>
            <path d="M12 12h8"></path>
            <path d="M12 19h8"></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">CLI Commands</h3>
      </div>
      
      {componentData.cli && componentData.cli.length > 0 ? (
        <div className="space-y-4">
          {componentData.cli.map((command, index) => (
            <div key={index} className="relative group">
              <pre className="bg-black p-4 rounded-lg text-green-400 overflow-auto font-mono border border-neutral-800 transition-all duration-300 group-hover:border-neutral-700">
                {command}
              </pre>
              <button
                onClick={() => handleCopy(index, command)}
                className="absolute top-3 right-3 bg-neutral-800 p-2 rounded-md hover:bg-neutral-700 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                {copied[index] ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} className="text-white" />
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-black p-4 rounded-lg border border-neutral-800 text-neutral-500 font-mono">
          No CLI commands available for this component.
        </div>
      )}
    </div>
  );
};

const CodeContent = ({ componentData }) => {
  const [language, setLanguage] = useState("ts");
  const [copied, setCopied] = useState({ utilFile: false, sourceCode: false });
  const [expandedBlock, setExpandedBlock] = useState({ utilFile: true, sourceCode: true });
  
  if (!componentData) return (
    <div className="flex items-center justify-center h-64 bg-neutral-900 rounded-xl border border-neutral-800">
      <div className="animate-pulse flex space-x-2">
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-75"></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
      </div>
    </div>
  );
  
  // Handle copy functionality
  const handleCopy = (blockId, code) => {
    navigator.clipboard.writeText(code);
    setCopied({ ...copied, [blockId]: true });
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [blockId]: false }));
    }, 2000);
  };
  
  // Toggle code block expansion
  const toggleExpand = (blockId) => {
    setExpandedBlock(prev => ({ ...prev, [blockId]: !prev[blockId] }));
  };
    const handleComponentAdded = () => {
    console.log("Component was added!");
    // Refresh component list or do other logic
  };
  return (
    <div className="space-y-8">
      {componentData.utilFile && (
        <div className="bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 shadow-lg hover:border-neutral-700 transition-all duration-300">
          <div className="flex items-center justify-between py-3 px-5 bg-neutral-900 border-b border-neutral-800">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => toggleExpand("utilFile")}
            >
              <span className="text-indigo-400 flex items-center">
                {expandedBlock.utilFile ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
              <div className="flex items-center">
                <span className="font-mono text-sm text-neutral-300">
                  lib/utils.{language === "ts" ? "ts" : "js"}
                </span>
                <div className="ml-3 px-2 py-0.5 text-xs rounded-full bg-indigo-500/20 text-indigo-400 font-medium">
                  Utility
                </div>
              </div>
            </div>

            {/* Language selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-xs bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-neutral-300"
            >
              <option value="ts">TypeScript</option>
              <option value="js">JavaScript</option>
            </select>
          </div>

          {/* Code Block */}
          {expandedBlock.utilFile && (
            <div className="relative">
              <pre className="relative flex text-sm font-mono leading-relaxed text-neutral-300 bg-neutral-950 max-h-96 overflow-auto">
                {/* Line numbers */}
                <div className="sticky left-0 top-0 px-4 py-5 text-right border-r border-neutral-800 bg-neutral-900/80 text-neutral-600 select-none min-w-[2.5rem]">
                  {Array.from({ length: componentData.utilFile.split("\n").length }).map((_, i) => (
                    <div key={i} className="px-1">{i + 1}</div>
                  ))}
                </div>

                {/* Code content */}
                <code className="px-4 py-5 whitespace-pre">{componentData.utilFile}</code>

                {/* Accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500"></div>
              </pre>

              {/* Copy button */}
              <button
                onClick={() => handleCopy("utilFile", componentData.utilFile)}
                className="absolute top-3 right-3 bg-neutral-800/90 p-2 rounded hover:bg-neutral-700 transition-all duration-200 opacity-0 hover:opacity-100 focus:opacity-100 shadow-lg z-10"
                title={copied.utilFile ? "Copied!" : "Copy code"}
              >
                {copied.utilFile ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} className="text-white" />
                )}
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 shadow-lg hover:border-neutral-700 transition-all duration-300">
        <div className="flex items-center justify-between py-3 px-5 bg-neutral-900 border-b border-neutral-800">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => toggleExpand('sourceCode')}
          >
            <span className="text-indigo-400 flex items-center">
              {expandedBlock.sourceCode ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
            <div className="flex items-center">
              <span className="font-mono text-sm text-neutral-300">
                components/ui/{componentData.componentName.toLowerCase()}.tsx
              </span>
              <div className="ml-3 px-2 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-400 font-medium">
                Component
              </div>
            </div>
          </div>
        </div>

        {/* Code content */}
        {expandedBlock.sourceCode && (
          <div className="relative">
            <pre className="relative flex text-sm font-mono leading-relaxed text-neutral-300 bg-neutral-950 max-h-96 overflow-auto">
              {/* Line numbers */}
              <div className="sticky left-0 top-0 px-4 py-5 text-right border-r border-neutral-800 bg-neutral-900/80 text-neutral-600 select-none min-w-[2.5rem]">
                {Array.from({ length: componentData.sourceCode.split('\n').length }).map((_, i) => (
                  <div key={i} className="px-1">{i + 1}</div>
                ))}
              </div>

              {/* Code content */}
              <code className="px-4 py-5 whitespace-pre">
                {componentData.sourceCode}
              </code>

              {/* Accent line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500"></div>
            </pre>

            {/* Copy button */}
            <button
              onClick={() => handleCopy('sourceCode', componentData.sourceCode)}
              className="absolute top-3 right-3 bg-neutral-800/90 p-2 rounded hover:bg-neutral-700 transition-all duration-200 opacity-0 hover:opacity-100 focus:opacity-100 shadow-lg z-10"
              title={copied.sourceCode ? "Copied!" : "Copy code"}
            >
              {copied.sourceCode ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-white" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default function DocsLayout() {
  const [activeTab, setActiveTab] = useState('Preview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('');
  const [components, setComponents] = useState([]);
  const [componentsData, setComponentsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleComponentAdded = () => {
    console.log("Component was added!");
    // Refresh component list or do other logic
  };

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/components');
        const data = response.data;

        const componentsMap = {};
        data.forEach(component => {
          componentsMap[component.componentName] = component;
        });

        const componentNames = data.map(component => component.componentName);

        setComponents(componentNames);
        setComponentsData(componentsMap);

        if (!activeComponent && componentNames.length > 0) {
          setActiveComponent(componentNames[0]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching components:', err);
        setError('Failed to load components. Please try again later.');
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);

  const renderTabContent = () => {
    if (loading) return <div className="text-center py-8">Loading component data...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
    if (!activeComponent || !componentsData[activeComponent]) return <div className="text-center py-8">Select a component from the sidebar</div>;

    const componentData = componentsData[activeComponent];

    switch (activeTab) {
      case 'CLI': return <CLIContent componentData={componentData} />;
      case 'Code': return <CodeContent componentData={componentData} />;
      default: return <ComponentPreview componentData={componentData} />;
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white font-sans flex flex-col">
    {/* Add Header Component Here */}
    <Header onAddComponent={handleComponentAdded} />
      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-neutral-800 hover:bg-neutral-700 p-2 rounded-xl shadow-lg transition"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-neutral-900/90 backdrop-blur-xl fixed h-full overflow-y-auto transition-transform duration-300 ease-in-out z-40 border-r border-white/10 shadow-xl
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">Components</h2>
          {loading ? (
            <div className="text-neutral-400">Loading components...</div>
          ) : error ? (
            <div className="text-red-500">Failed to load components</div>
          ) : (
            <ul className="space-y-2">
              {components.map((component) => (
                <li key={component}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveComponent(component);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      component === activeComponent
                        ? 'bg-white/10 text-white'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {component}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 px-6 md:px-12 lg:px-24 py-10">
        {loading ? (
          <div className="text-center py-12 text-white/70">Loading component documentation...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : !activeComponent || !componentsData[activeComponent] ? (
          <div className="text-center py-12 text-white/50">Select a component from the sidebar</div>
        ) : (
          <>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              {componentsData[activeComponent].componentHeading ||
                activeComponent
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
            </h1>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['Preview', 'Code', 'CLI'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border backdrop-blur-sm transition-all shadow-sm
                    ${activeTab === tab
                      ? 'bg-white text-black'
                      : 'border-white/10 text-white/70 hover:text-white hover:border-white/30'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Installation */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-3 tracking-tight">Installation</h2>
              <pre className="bg-neutral-900 text-green-400 px-5 py-4 rounded-xl shadow-inner overflow-auto text-sm">
                {componentsData[activeComponent].installation}
              </pre>
            </div>

            {/* Usage */}
            <div className="space-y-10">
              <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
              {renderTabContent()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
