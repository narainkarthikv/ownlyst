import { motion } from 'framer-motion';
import {
  MessageSquare,
  GitPullRequest,
  Users,
  Heart,
  Github,
  Twitter,
  Linkedin,
  MessageCircle,
} from 'lucide-react';

const communityChannels = [
  {
    icon: <MessageCircle className="w-8 h-8 text-indigo-600" />,
    title: 'Discord Community',
    description:
      'Join our Discord server to chat with other users, get help, and share ideas.',
    buttonText: 'Join Discord',
    href: '#',
    members: '5,000+ members',
  },
  {
    icon: <Github className="w-8 h-8 text-gray-900" />,
    title: 'GitHub Discussions',
    description:
      'Participate in technical discussions, report bugs, and contribute to the project.',
    buttonText: 'View Discussions',
    href: '#',
    members: '2,000+ discussions',
  },
  {
    icon: <Twitter className="w-8 h-8 text-blue-500" />,
    title: 'Twitter Community',
    description:
      'Follow us on Twitter for updates, tips, and community highlights.',
    buttonText: 'Follow Us',
    href: '#',
    members: '10K+ followers',
  },
];

const guidelines = [
  {
    icon: <Heart className="w-6 h-6 text-red-500" />,
    title: 'Be Kind and Respectful',
    description:
      'Treat everyone with respect. No harassment, hate speech, or bullying.',
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
    title: 'Stay On Topic',
    description:
      'Keep discussions relevant to Sticky Memo and productivity tools.',
  },
  {
    icon: <Users className="w-6 h-6 text-green-500" />,
    title: 'Help Others',
    description:
      'Share your knowledge and help other community members when you can.',
  },
  {
    icon: <GitPullRequest className="w-6 h-6 text-purple-500" />,
    title: 'Contribute',
    description:
      'Consider contributing to the project through feedback, code, or documentation.',
  },
];

const featuredDiscussions = [
  {
    title: 'Best practices for organizing large teams',
    author: 'Sarah Chen',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50',
    replies: 24,
    category: 'Teams',
  },
  {
    title: 'New timeline view feature suggestions',
    author: 'Michael Rodriguez',
    avatar:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50',
    replies: 18,
    category: 'Feature Request',
  },
  {
    title: 'Tips for remote team collaboration',
    author: 'Emma Thompson',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50',
    replies: 32,
    category: 'Tips & Tricks',
  },
];

export default function CommunityPage() {
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
              Join Our Community
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Connect with other Sticky Memo users, share ideas, and get help
              from our vibrant community.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Community Channels */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {communityChannels.map((channel, index) => (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="mb-4">{channel.icon}</div>
              <h3 className="text-xl font-bold mb-2">{channel.title}</h3>
              <p className="text-gray-600 mb-4">{channel.description}</p>
              <p className="text-sm text-gray-500 mb-4">{channel.members}</p>
              <button className="w-full py-2 px-4 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                {channel.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Community Guidelines</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Help us maintain a healthy and productive community by following
            these guidelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={guideline.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                {guideline.icon}
                <h3 className="text-lg font-bold ml-3">{guideline.title}</h3>
              </div>
              <p className="text-gray-600">{guideline.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Discussions */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Featured Discussions</h2>
            <p className="text-gray-600">
              Join the conversation in our most active discussions.
            </p>
          </motion.div>

          <div className="space-y-6">
            {featuredDiscussions.map((discussion, index) => (
              <motion.div
                key={discussion.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <img
                      src={discussion.avatar}
                      alt={discussion.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-bold mb-1">{discussion.title}</h3>
                      <p className="text-sm text-gray-500">
                        by {discussion.author}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      {discussion.replies} replies
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        discussion.category === 'Teams'
                          ? 'bg-blue-100 text-blue-700'
                          : discussion.category === 'Feature Request'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {discussion.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
            >
              <Twitter className="w-8 h-8" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#24292E] transition-colors"
            >
              <Github className="w-8 h-8" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#0A66C2] transition-colors"
            >
              <Linkedin className="w-8 h-8" />
            </a>
          </div>
        </motion.div>
      </div>

    </div>
  );
}