import { motion } from 'framer-motion';
import {
  Pin,
  Palette,
  Filter,
  StickyNote,
  LayoutDashboard,
  Table,
  Baseline as Timeline,
  Cloud,
  Share2,
  Users,
  Lock,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: <Pin className='w-12 h-12 text-blue-600' />,
    title: 'Smart Pinning',
    desc: 'Keep important notes at the top of your lists and boards. Pinned notes stay synchronized across all views and remain easily accessible.',
  },
  {
    icon: <Palette className='w-12 h-12 text-blue-600' />,
    title: 'Color Coding',
    desc: 'Visual organization through color-coded priorities. Green for low, orange for medium, and red for high priority tasks.',
  },
  {
    icon: <Filter className='w-12 h-12 text-blue-600' />,
    title: 'Advanced Filtering',
    desc: 'Powerful search and filter capabilities. Find notes by status, date, title, or custom tags. Save frequent searches for quick access.',
  },
  {
    icon: <Cloud className='w-12 h-12 text-blue-600' />,
    title: 'Cloud Sync',
    desc: 'Seamless synchronization across all your devices. Your notes are always up-to-date and accessible from anywhere.',
  },
  {
    icon: <Share2 className='w-12 h-12 text-blue-600' />,
    title: 'Easy Sharing',
    desc: 'Share notes and boards with team members. Control access levels and collaborate in real-time on shared content.',
  },
  {
    icon: <Lock className='w-12 h-12 text-blue-600' />,
    title: 'Secure Storage',
    desc: 'Enterprise-grade security for your data. End-to-end encryption ensures your notes remain private and protected.',
  },
];

const views = [
  {
    icon: <StickyNote className='w-10 h-10 text-green-600' />,
    title: 'Notes View',
    desc: 'Traditional card-based layout perfect for quick note-taking and organization. Drag and drop support for easy arrangement.',
  },
  {
    icon: <LayoutDashboard className='w-10 h-10 text-blue-600' />,
    title: 'Boards View',
    desc: 'Kanban-style boards for visual task management. Create custom columns and move cards between different stages.',
  },
  {
    icon: <Table className='w-10 h-10 text-cyan-600' />,
    title: 'Tables View',
    desc: 'Structured data view with sorting and filtering capabilities. Perfect for managing detailed information in a spreadsheet format.',
  },
  {
    icon: <Timeline className='w-10 h-10 text-orange-600' />,
    title: 'Roadmap View',
    desc: 'Timeline visualization for project planning. Map out your tasks and milestones on an interactive timeline.',
  },
];

export default function FeaturesPage() {
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
              Powerful Features for Modern Teams
            </h1>
            <p className='text-xl text-white/90 max-w-3xl mx-auto'>
              Discover how Sticky Memo can transform your workflow with its
              comprehensive suite of features designed for productivity.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Core Features Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-4'>Core Features</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Everything you need to capture, organize, and manage your notes
            efficiently
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
              className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
              <div className='mb-4'>{feature.icon}</div>
              <h3 className='text-xl font-bold mb-2'>{feature.title}</h3>
              <p className='text-gray-600'>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Views Section */}
      <div className='bg-gray-100 py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'>
            <h2 className='text-3xl font-bold mb-4'>Flexible Views</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Switch between different views to match your working style and
              project needs
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {views.map((view, index) => (
              <motion.div
                key={view.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className='bg-white rounded-2xl p-8 shadow-lg border border-gray-100'>
                <div className='mb-4'>{view.icon}</div>
                <h3 className='text-xl font-bold mb-2'>{view.title}</h3>
                <p className='text-gray-600'>{view.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Power Features Section */}
      <div className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-16'>
            <Zap className='w-12 h-12 text-blue-600 mx-auto mb-4' />
            <h2 className='text-3xl font-bold mb-4'>Power Features</h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Advanced capabilities for power users and teams
            </p>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='bg-blue-50 rounded-2xl p-8 border border-blue-100'>
              <h3 className='text-xl font-bold mb-4'>Team Collaboration</h3>
              <ul className='space-y-3 text-gray-700'>
                <li className='flex items-center'>
                  <Users className='w-5 h-5 text-blue-600 mr-2' />
                  Real-time collaboration on shared notes
                </li>
                <li className='flex items-center'>
                  <Lock className='w-5 h-5 text-blue-600 mr-2' />
                  Granular permission controls
                </li>
                <li className='flex items-center'>
                  <Share2 className='w-5 h-5 text-blue-600 mr-2' />
                  Easy sharing with external stakeholders
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='bg-blue-50 rounded-2xl p-8 border border-blue-100'>
              <h3 className='text-xl font-bold mb-4'>Advanced Organization</h3>
              <ul className='space-y-3 text-gray-700'>
                <li className='flex items-center'>
                  <Filter className='w-5 h-5 text-blue-600 mr-2' />
                  Custom tags and categories
                </li>
                <li className='flex items-center'>
                  <Cloud className='w-5 h-5 text-blue-600 mr-2' />
                  Automatic backups and version history
                </li>
                <li className='flex items-center'>
                  <Pin className='w-5 h-5 text-blue-600 mr-2' />
                  Smart sorting and prioritization
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
