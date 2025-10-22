import { motion } from 'framer-motion';
import { Menu, Search, ChevronRight, FileText, Wrench, Code } from 'lucide-react';

const sidebarSections = [
  {
    title: 'Getting Started',
    links: [
      { title: 'Introduction', href: '#introduction' },
      { title: 'Installation', href: '#installation' },
      { title: 'Quick Start Guide', href: '#quick-start' },
    ],
  },
  {
    title: 'Core Concepts',
    links: [
      { title: 'Notes & Cards', href: '#notes' },
      { title: 'Views & Layouts', href: '#views' },
      { title: 'Tags & Categories', href: '#tags' },
      { title: 'Search & Filters', href: '#search' },
    ],
  },
  {
    title: 'Advanced Features',
    links: [
      { title: 'Workspaces', href: '#workspaces' },
      { title: 'Team Management', href: '#teams' },
      { title: 'Integrations', href: '#integrations' },
      { title: 'API Access', href: '#api' },
    ],
  },
];

const apiEndpoints = [
  {
    method: 'GET',
    endpoint: '/api/v1/notes',
    description: 'List all notes',
  },
  {
    method: 'POST',
    endpoint: '/api/v1/notes',
    description: 'Create a new note',
  },
  {
    method: 'PUT',
    endpoint: '/api/v1/notes/:id',
    description: 'Update a note',
  },
  {
    method: 'DELETE',
    endpoint: '/api/v1/notes/:id',
    description: 'Delete a note',
  },
];

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Documentation</h2>
              <Menu className="w-5 h-5 text-gray-500" />
            </div>
            
            {/* Search */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search docs..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Navigation */}
            <nav className="space-y-8">
              {sidebarSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="flex items-center text-gray-600 hover:text-blue-600 py-1 text-sm"
                        >
                          <ChevronRight className="w-4 h-4 mr-2" />
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 px-4 py-12 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="introduction"
              className="mb-12"
            >
              <div className="flex items-center mb-6">
                <FileText className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold">Introduction</h1>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                Welcome to the Sticky Memo documentation. Here you'll find
                everything you need to know about using our platform effectively.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="font-bold mb-2">Quick Navigation</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li>
                    <a
                      href="#quick-start"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Quick Start Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="#api"
                      className="flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <ChevronRight className="w-4 h-4 mr-2" />
                      API Documentation
                    </a>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Installation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              id="installation"
              className="mb-12"
            >
              <div className="flex items-center mb-6">
                <Wrench className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold">Installation</h2>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 mb-6">
                <code className="text-green-400">
                  $ npm install @sticky-memo/client
                </code>
              </div>
              <p className="text-gray-600 mb-4">
                After installation, you can import and use the Sticky Memo client
                in your application:
              </p>
              <div className="bg-gray-900 rounded-xl p-6">
                <code className="text-blue-400">
                  import {'{'} StickyMemo {'}'} from '@sticky-memo/client';
                </code>
              </div>
            </motion.section>

            {/* API Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              id="api"
              className="mb-12"
            >
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold">API Reference</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Our RESTful API allows you to integrate Sticky Memo with your
                applications. Here are the main endpoints:
              </p>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint) => (
                  <div
                    key={endpoint.endpoint}
                    className="bg-white rounded-xl p-6 border border-gray-200"
                  >
                    <div className="flex items-center mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-mono mr-3 ${
                          endpoint.method === 'GET'
                            ? 'bg-green-100 text-green-700'
                            : endpoint.method === 'POST'
                            ? 'bg-blue-100 text-blue-700'
                            : endpoint.method === 'PUT'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="font-mono text-gray-700">
                        {endpoint.endpoint}
                      </code>
                    </div>
                    <p className="text-gray-600">{endpoint.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </main>
      </div>

    </div>
  );
}