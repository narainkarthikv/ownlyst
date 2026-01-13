import { motion } from 'framer-motion';
import { Calendar, Star, Bug, Zap, Sparkles } from 'lucide-react';

const updates = [
  {
    version: '2.4.0',
    date: 'October 15, 2025',
    type: 'feature',
    icon: <Star className='w-6 h-6 text-yellow-500' />,
    title: 'New Timeline View',
    description:
      'Introducing our new Timeline view for better project planning and milestone tracking.',
    changes: [
      'Interactive timeline visualization',
      'Drag and drop scheduling',
      'Custom milestone markers',
      'Timeline filtering options',
    ],
  },
  {
    version: '2.3.2',
    date: 'October 1, 2025',
    type: 'bugfix',
    icon: <Bug className='w-6 h-6 text-red-500' />,
    title: 'Performance Improvements',
    description: 'Major performance enhancements and bug fixes.',
    changes: [
      'Improved loading times for large boards',
      'Fixed search indexing issues',
      'Resolved syncing conflicts',
      'Memory optimization for mobile devices',
    ],
  },
  {
    version: '2.3.0',
    date: 'September 15, 2025',
    type: 'feature',
    icon: <Zap className='w-6 h-6 text-blue-500' />,
    title: 'Advanced Search',
    description: 'Enhanced search capabilities with new filtering options.',
    changes: [
      'Full-text search across all notes',
      'Advanced filter combinations',
      'Saved search presets',
      'Search result highlighting',
    ],
  },
  {
    version: '2.2.0',
    date: 'September 1, 2025',
    type: 'feature',
    icon: <Sparkles className='w-6 h-6 text-purple-500' />,
    title: 'UI Refresh',
    description: 'A fresh new look with improved usability.',
    changes: [
      'New color schemes and themes',
      'Redesigned navigation',
      'Improved mobile responsiveness',
      'Updated icons and animations',
    ],
  },
];

export default function UpdatesPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='bg-gradient-to-br from-blue-500 to-pink-500 text-white py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='text-center'>
            <h1 className='text-4xl md:text-5xl font-extrabold mb-4'>
              What's New in Sticky Memo
            </h1>
            <p className='text-xl text-white/90 max-w-3xl mx-auto'>
              Stay up to date with the latest features, improvements, and bug
              fixes.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Updates Timeline */}
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='space-y-12'>
          {updates.map((update, index) => (
            <motion.div
              key={update.version}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className='relative'>
              <div className='flex items-start space-x-6'>
                {/* Version Badge */}
                <div className='flex-shrink-0 mt-1'>
                  <div className='flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md'>
                    {update.icon}
                  </div>
                </div>

                {/* Update Content */}
                <div className='flex-grow bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
                  <div className='flex items-start justify-between mb-4'>
                    <div>
                      <h2 className='text-2xl font-bold mb-1'>
                        {update.title}
                      </h2>
                      <div className='flex items-center text-sm text-gray-500 space-x-4'>
                        <span className='flex items-center'>
                          <Calendar className='w-4 h-4 mr-1' />
                          {update.date}
                        </span>
                        <span className='font-mono'>v{update.version}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        update.type === 'feature'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                      {update.type === 'feature' ? 'Feature' : 'Bug Fix'}
                    </span>
                  </div>

                  <p className='text-gray-600 mb-4'>{update.description}</p>

                  <ul className='space-y-2'>
                    {update.changes.map((change, idx) => (
                      <li key={idx} className='flex items-start text-gray-700'>
                        <span className='w-2 h-2 mt-2 mr-2 rounded-full bg-blue-500' />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Future Updates */}
      <div className='bg-gray-100 py-20'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>Coming Soon</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Here's what we're working on for future updates.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='bg-white rounded-xl p-6 shadow-md'>
              <h3 className='text-lg font-bold mb-2'>
                AI-Powered Organization
              </h3>
              <p className='text-gray-600'>
                Smart categorization and tagging suggestions based on note
                content.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='bg-white rounded-xl p-6 shadow-md'>
              <h3 className='text-lg font-bold mb-2'>Advanced Collaboration</h3>
              <p className='text-gray-600'>
                Real-time editing and commenting features for team workspaces.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
