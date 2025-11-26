import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'The Future of Digital Note-Taking',
    excerpt:
      'Explore how AI and cloud technology are transforming the way we capture and organize information.',
    author: 'Sarah Chen',
    date: 'October 15, 2025',
    readTime: '5 min read',
    category: 'Technology',
    image:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop',
  },
  {
    title: 'Building a Remote-First Company Culture',
    excerpt:
      'Learn how we built a thriving company culture with team members across 20 different countries.',
    author: 'Michael Rodriguez',
    date: 'October 10, 2025',
    readTime: '8 min read',
    category: 'Company Culture',
    image:
      'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop',
  },
  {
    title: 'Productivity Tips for Remote Teams',
    excerpt:
      'Discover the best practices for keeping remote teams organized and productive using digital tools.',
    author: 'Emma Thompson',
    date: 'October 5, 2025',
    readTime: '6 min read',
    category: 'Productivity',
    image:
      'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop',
  },
  {
    title: 'The Psychology of Color in Note Organization',
    excerpt:
      'Understanding how color coding can improve information retention and task management.',
    author: 'David Kim',
    date: 'October 1, 2025',
    readTime: '7 min read',
    category: 'Research',
    image:
      'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&fit=crop',
  },
];

const categories = [
  'All',
  'Technology',
  'Productivity',
  'Company Culture',
  'Research',
  'Tips & Tricks',
];

export default function BlogPage() {
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
              Sticky Memo Blog
            </h1>
            <p className='text-xl text-white/90 max-w-3xl mx-auto'>
              Insights, updates, and stories from the Sticky Memo team
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Categories */}
      <div className='border-b border-gray-200 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex space-x-8 overflow-x-auto py-4 scrollbar-hide'>
            {categories.map((category) => (
              <button
                key={category}
                className={`text-sm font-medium whitespace-nowrap ${
                  category === 'All'
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='bg-white rounded-2xl overflow-hidden shadow-lg'>
          <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/2'>
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className='w-full h-64 md:h-full object-cover'
              />
            </div>
            <div className='md:w-1/2 p-8 md:p-12'>
              <span className='text-blue-600 text-sm font-bold'>
                {blogPosts[0].category}
              </span>
              <h2 className='text-2xl font-bold mt-2 mb-4'>
                {blogPosts[0].title}
              </h2>
              <p className='text-gray-600 mb-6'>{blogPosts[0].excerpt}</p>
              <div className='flex items-center text-sm text-gray-500 mb-6'>
                <User className='w-4 h-4 mr-2' />
                {blogPosts[0].author}
                <span className='mx-3'>•</span>
                <Calendar className='w-4 h-4 mr-2' />
                {blogPosts[0].date}
                <span className='mx-3'>•</span>
                <Clock className='w-4 h-4 mr-2' />
                {blogPosts[0].readTime}
              </div>
              <button className='flex items-center text-blue-600 font-bold hover:text-blue-700'>
                Read More
                <ArrowRight className='w-4 h-4 ml-2' />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Posts Grid */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
        <h2 className='text-2xl font-bold mb-8'>Recent Posts</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPosts.slice(1).map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className='bg-white rounded-xl overflow-hidden shadow-lg'>
              <img
                src={post.image}
                alt={post.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <span className='text-blue-600 text-sm font-bold'>
                  {post.category}
                </span>
                <h3 className='text-xl font-bold mt-2 mb-3'>{post.title}</h3>
                <p className='text-gray-600 text-sm mb-4'>{post.excerpt}</p>
                <div className='flex items-center text-sm text-gray-500 mb-4'>
                  <User className='w-4 h-4 mr-2' />
                  {post.author}
                  <span className='mx-3'>•</span>
                  <Clock className='w-4 h-4 mr-2' />
                  {post.readTime}
                </div>
                <button className='flex items-center text-blue-600 font-bold hover:text-blue-700 text-sm'>
                  Read More
                  <ArrowRight className='w-4 h-4 ml-2' />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className='bg-gray-100 py-20'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center'>
            <h2 className='text-3xl font-bold mb-4'>
              Subscribe to Our Newsletter
            </h2>
            <p className='text-gray-600 mb-8'>
              Get the latest posts and updates delivered straight to your inbox.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 max-w-lg mx-auto'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button className='px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors'>
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
