import { motion } from 'framer-motion';
import {
  Search,
  ChevronDown,
  Maximize2,
  Layout,
  Users,
  Settings,
  Clock,
  Shield,
  BookOpen,
} from 'lucide-react';

const categories = [
  {
    icon: <Maximize2 className="w-6 h-6 text-blue-600" />,
    title: 'Getting Started',
    questions: [
      'How do I create my first note?',
      'How do I organize notes into categories?',
      'Can I import notes from other apps?',
      'How do I share notes with my team?',
    ],
  },
  {
    icon: <Layout className="w-6 h-6 text-green-600" />,
    title: 'Views & Organization',
    questions: [
      'How do I switch between different views?',
      'What are smart filters?',
      'How do I use the kanban board?',
      'Can I customize the timeline view?',
    ],
  },
  {
    icon: <Users className="w-6 h-6 text-purple-600" />,
    title: 'Teams & Sharing',
    questions: [
      'How do I invite team members?',
      'What are the different permission levels?',
      'How do I create a team workspace?',
      'Can I share notes with external users?',
    ],
  },
  {
    icon: <Settings className="w-6 h-6 text-orange-600" />,
    title: 'Account Settings',
    questions: [
      'How do I change my password?',
      'Can I enable two-factor authentication?',
      'How do I update billing information?',
      'How do I cancel my subscription?',
    ],
  },
  {
    icon: <Clock className="w-6 h-6 text-red-600" />,
    title: 'Sync & Backup',
    questions: [
      'How often are my notes synced?',
      'Can I access my notes offline?',
      'How do I restore previous versions?',
      'Where is my data stored?',
    ],
  },
  {
    icon: <Shield className="w-6 h-6 text-indigo-600" />,
    title: 'Security & Privacy',
    questions: [
      'Is my data encrypted?',
      'Who can access my notes?',
      'How do you handle data privacy?',
      'Can I export my data?',
    ],
  },
];

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-blue-500 to-pink-500 text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              How can we help?
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Find answers to common questions and learn how to make the most of
              Sticky Memo.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full px-6 py-4 rounded-xl text-gray-900 bg-white/95 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            href="/docs"
            className="bg-white rounded-xl p-6 shadow-lg flex items-center hover:scale-105 transition-transform"
          >
            <BookOpen className="w-8 h-8 text-blue-600 mr-4" />
            <div>
              <h3 className="font-bold mb-1">Documentation</h3>
              <p className="text-sm text-gray-600">
                Detailed guides and tutorials
              </p>
            </div>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            href="/community"
            className="bg-white rounded-xl p-6 shadow-lg flex items-center hover:scale-105 transition-transform"
          >
            <Users className="w-8 h-8 text-green-600 mr-4" />
            <div>
              <h3 className="font-bold mb-1">Community</h3>
              <p className="text-sm text-gray-600">
                Join discussions and get help
              </p>
            </div>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            href="/contact"
            className="bg-white rounded-xl p-6 shadow-lg flex items-center hover:scale-105 transition-transform"
          >
            <Shield className="w-8 h-8 text-purple-600 mr-4" />
            <div>
              <h3 className="font-bold mb-1">Support</h3>
              <p className="text-sm text-gray-600">
                Contact our support team
              </p>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Help Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-6">
                {category.icon}
                <h3 className="text-xl font-bold ml-3">{category.title}</h3>
              </div>
              <ul className="space-y-4">
                {category.questions.map((question, qIndex) => (
                  <motion.li
                    key={qIndex}
                    whileHover={{
                      x: 4,
                      transition: { duration: 0.2 },
                    }}
                    className="flex items-center text-gray-700 cursor-pointer group"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400 mr-2 group-hover:text-blue-500 transition-colors" />
                    <span className="group-hover:text-blue-600 transition-colors">
                      {question}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Still Need Help */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 text-center shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-8">
              Can't find what you're looking for? Our support team is here to
              help you.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </motion.div>
        </div>
      </div>

    </div>
  );
}