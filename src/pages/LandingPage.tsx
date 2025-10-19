import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Table,
  LayoutDashboard,
  Baseline as Timeline,
  Pin,
  Palette,
  Filter,
  StickyNote,
} from 'lucide-react';
import Logo from '../components/Logo';

const features = [
  {
    icon: <Pin className='w-10 h-10 text-blue-600' />,
    title: 'Smart Pinning',
    desc: 'Pin important notes to keep them at the top and never lose track of critical tasks.',
  },
  {
    icon: <Palette className='w-10 h-10 text-blue-600' />,
    title: 'Color Coding',
    desc: 'Organize with priority-based colors: green for low, orange for medium, red for high priority.',
  },
  {
    icon: <Filter className='w-10 h-10 text-blue-600' />,
    title: 'Advanced Filtering',
    desc: "Filter by status, date, or title to find exactly what you're looking for instantly.",
  },
];

const views = [
  {
    icon: <StickyNote className='w-8 h-8 text-green-600' />,
    title: 'Notes View',
    desc: 'Card-based layout for visual organization',
  },
  {
    icon: <LayoutDashboard className='w-8 h-8 text-blue-600' />,
    title: 'Boards View',
    desc: 'Kanban-style boards for workflow management',
  },
  {
    icon: <Table className='w-8 h-8 text-cyan-600' />,
    title: 'Tables View',
    desc: 'Detailed spreadsheet-like data view',
  },
  {
    icon: <Timeline className='w-8 h-8 text-orange-600' />,
    title: 'Roadmap View',
    desc: 'Timeline visualization for project planning',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    text: 'Sticky Memo has revolutionized how our team manages projects. The color coding and multiple views make everything so much clearer.',
  },
  {
    name: 'Mike Chen',
    role: 'Software Developer',
    avatar:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    text: 'The filtering and sorting features save me hours every week. I can find any note or task in seconds.',
  },
  {
    name: 'Emma Davis',
    role: 'Design Lead',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    text: 'Beautiful interface and intuitive design. It feels like using real sticky notes but with all the digital advantages.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='bg-gray-50 text-gray-900 min-h-screen w-full overflow-x-hidden'>
      {/* Hero Section */}
      <div
        id='hero'
        className='w-full min-h-[420px] px-0 py-0 bg-gradient-to-br from-blue-500 to-pink-500 text-white relative'
        style={{
          boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)',
          borderBottom: '1px solid #e5e8ef',
        }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='max-w-7xl mx-auto pt-7 pb-4 px-4 md:px-6 min-h-[420px] flex flex-col items-start justify-center overflow-visible'>
          {/* Logo and Brand Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex items-center mb-4 cursor-pointer hover:scale-105 transition-transform duration-200'
            onClick={() => navigate('/')}>
            <Logo size={48} />
            <h1
              className='ml-3 text-2xl md:text-3xl font-extrabold'
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              Sticky Memo
            </h1>
          </motion.div>

          <div className='flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-8'>
            <div className='flex-1 min-w-[320px]'>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className='text-4xl md:text-5xl font-extrabold leading-tight mb-2'
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                Capture thoughts.
                <br />
                Stay organized.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className='mb-4 text-white/90 font-normal text-lg md:text-xl max-w-[520px]'
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                Transform your productivity with the intuitive note-taking app
                that brings the simplicity of sticky notes to the digital world.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className='flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className='font-bold text-base px-6 py-3 rounded-xl bg-white/95 text-blue-500 w-full sm:w-auto hover:bg-white hover:shadow-lg transition-all duration-200'
                  style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
                  onClick={() => navigate('/notes')}>
                  Start Taking Notes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className='font-bold text-base px-6 py-3 rounded-xl border-2 border-white/80 text-white w-full sm:w-auto hover:border-white hover:bg-white/10 transition-all duration-200 backdrop-blur-sm'
                  onClick={() => scrollToSection('features')}>
                  Watch Demo
                </motion.button>
              </motion.div>
            </div>
            {/* Demo Cards Illustration */}
            <div className='flex-1 flex justify-center md:justify-end items-center min-w-full md:min-w-[340px] mt-3 md:mt-0 pr-0 md:pr-2 overflow-visible'>
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className='p-4 rounded-2xl bg-white w-full md:w-96 max-w-full md:max-w-96 min-w-0 md:min-w-[340px] overflow-hidden'
                style={{ boxShadow: '0 12px 48px rgba(0,0,0,0.15)' }}>
                <div className='grid grid-cols-2 gap-2'>
                  <div>
                    <div className='bg-green-200 rounded-lg p-3 mb-3 min-h-[56px] border border-green-300'>
                      <p className='text-green-800 font-bold text-sm'>
                        Design Review
                      </p>
                      <p className='text-gray-600 text-xs'>Due: Today</p>
                    </div>
                    <div className='bg-orange-200 rounded-lg p-3 min-h-[56px] border border-orange-300'>
                      <p className='text-orange-800 font-bold text-sm'>
                        Bug Fixes
                      </p>
                      <p className='text-gray-600 text-xs'>Due: Friday</p>
                    </div>
                  </div>
                  <div>
                    <div className='bg-red-200 rounded-lg p-3 mb-3 min-h-[56px] border border-red-300'>
                      <p className='text-red-800 font-bold text-sm'>
                        Client Meeting
                      </p>
                      <p className='text-gray-600 text-xs'>Due: Tomorrow</p>
                    </div>
                    <div className='bg-blue-200 rounded-lg p-3 min-h-[56px] border border-blue-300'>
                      <p className='text-blue-800 font-bold text-sm'>
                        Team Standup
                      </p>
                      <p className='text-gray-600 text-xs'>Due: Weekly</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div
        id='features'
        className='max-w-7xl mx-auto py-16 md:py-20 px-6 md:px-8'>
        <div className='w-full max-w-full md:max-w-5xl mx-auto text-center'>
          <h3 className='text-3xl md:text-4xl font-extrabold mb-3'>
            Powerful Features for Better Organization
          </h3>
          <p className='mb-10 text-gray-500 text-lg font-normal'>
            Everything you need to manage your tasks and ideas efficiently
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center max-w-full md:max-w-5xl mx-auto'>
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              whileHover={{
                y: -8,
                boxShadow: '0 8px 32px rgba(80,80,180,0.18)',
              }}
              transition={{ type: 'spring', stiffness: 200 }}
              className='bg-blue-50 rounded-2xl p-6 min-h-[220px] flex flex-col items-center border border-blue-100'
              style={{ boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)' }}>
              <div className='mb-4'>{feature.icon}</div>
              <h4 className='text-xl font-bold mb-2 text-center'>
                {feature.title}
              </h4>
              <p className='text-gray-600 text-center text-sm'>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Views Section */}
      <div
        id='views'
        className='w-full bg-gray-100 py-16 md:py-20 border-t border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-6 md:px-8'>
          <div className='w-full max-w-full md:max-w-5xl mx-auto text-center'>
            <h3 className='text-3xl md:text-4xl font-extrabold mb-3'>
              Multiple Views for Every Workflow
            </h3>
            <p className='mb-10 text-gray-500 text-lg font-normal'>
              Switch between different views to match your working style
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center max-w-full md:max-w-5xl mx-auto'>
            {views.map((view) => (
              <motion.div
                key={view.title}
                whileHover={{
                  scale: 1.04,
                  boxShadow: '0 8px 32px rgba(80,80,180,0.14)',
                }}
                transition={{ type: 'spring', stiffness: 200 }}
                className='bg-gray-200 rounded-2xl p-4 min-h-[120px] flex flex-col items-start border border-gray-300'
                style={{ boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)' }}>
                <div className='mb-3 text-4xl'>{view.icon}</div>
                <h4 className='text-lg font-bold mb-1 text-left'>
                  {view.title}
                </h4>
                <p className='text-gray-600 text-left text-sm'>{view.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        id='testimonials'
        className='max-w-7xl mx-auto py-16 md:py-20 px-6 md:px-8'>
        <div className='w-full max-w-full md:max-w-5xl mx-auto text-center'>
          <h3 className='text-3xl md:text-4xl font-extrabold mb-3'>
            Loved by Teams Worldwide
          </h3>
          <p className='mb-10 text-gray-500 text-lg font-normal'>
            See what our users have to say about Sticky Memo
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center max-w-full md:max-w-5xl mx-auto'>
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              whileHover={{
                y: -6,
                boxShadow: '0 8px 32px rgba(80,80,180,0.10)',
              }}
              transition={{ type: 'spring', stiffness: 200 }}
              className='bg-blue-50 rounded-2xl p-6 min-h-[200px] flex flex-col items-center border border-blue-100'
              style={{ boxShadow: '0 2px 16px 0 rgba(80,80,180,0.06)' }}>
              <img
                src={t.avatar}
                alt={t.name}
                className='w-16 h-16 rounded-full mb-4 object-cover'
              />
              <h4 className='text-lg font-bold'>{t.name}</h4>
              <p className='text-gray-500 mb-2 text-sm'>{t.role}</p>
              <p className='text-gray-600 text-center text-sm'>{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <motion.div
        id='cta'
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className='py-16 md:py-20 px-6 md:px-8 bg-gradient-to-br from-pink-500 to-blue-500 text-white border-t border-gray-200'>
        <div className='max-w-4xl mx-auto text-center py-12'>
          <h3 className='text-3xl md:text-4xl font-extrabold mb-4'>
            Ready to Transform Your Productivity?
          </h3>
          <p className='mb-8 text-white/90 font-normal text-lg md:text-xl'>
            Join thousands of teams already using Sticky Memo to organize their
            work and boost productivity.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-4'>
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className='font-bold text-base px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200'
              style={{ boxShadow: '0 2px 8px 0 rgba(80,80,180,0.10)' }}
              onClick={() => navigate('/notes')}>
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className='font-bold text-base px-6 py-3 rounded-lg border-2 border-white text-white hover:bg-white/10 transition-colors duration-200'
              onClick={() => navigate('/notes')}>
              Open App Now
            </motion.button>
          </div>
          <p className='text-white/85 text-sm mt-4'>
            No credit card required • 14-day free trial
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <div className='bg-gray-900 text-white py-10 px-6 md:px-8 border-t border-gray-700 mt-0'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8'>
          <div className='min-w-[180px] mb-6 md:mb-0'>
            <div className='flex items-center mb-4'>
              <Logo size={32} />
              <h4 className='text-blue-400 text-xl font-extrabold ml-2'>
                Sticky Memo
              </h4>
            </div>
            <p className='text-gray-400 text-sm'>
              The ultimate digital sticky note solution for modern teams.
            </p>
          </div>
          <div className='flex flex-row gap-12 flex-wrap'>
            <div>
              <h5 className='text-white mb-2 text-sm font-bold'>Product</h5>
              <button
                onClick={() => navigate('/features')}
                className='text-gray-400 hover:text-gray-300 text-sm mb-1 w-full text-left transition-colors'>
                Features
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className='text-gray-400 hover:text-gray-300 text-sm mb-1 w-full text-left transition-colors'>
                Pricing
              </button>
              <button
                onClick={() => navigate('/updates')}
                className='text-gray-400 hover:text-gray-300 text-sm w-full text-left transition-colors'>
                Updates
              </button>
            </div>
            <div>
              <h5 className='text-white mb-2 text-sm font-bold'>Company</h5>
              <button
                onClick={() => navigate('/about')}
                className='text-gray-400 hover:text-gray-300 text-sm mb-1 w-full text-left transition-colors'>
                About
              </button>
              <button
                onClick={() => navigate('/blog')}
                className='text-gray-400 hover:text-gray-300 text-sm mb-1 w-full text-left transition-colors'>
                Blog
              </button>
              <button
                onClick={() => navigate('/contact')}
                className='text-gray-400 hover:text-gray-300 text-sm w-full text-left transition-colors'>
                Contact
              </button>
            </div>
            <div>
              <h5 className='text-white mb-2 text-sm font-bold'>Support</h5>
              <button
                onClick={() => navigate('/help')}
                className='text-gray-400 hover:text-gray-300 text-sm mb-1 w-full text-left transition-colors'>
                Help Center
              </button>
              <button
                onClick={() => navigate('/docs')}
                className='text-gray-400 hover:text-gray-300 text-sm mb-1 w-full text-left transition-colors'>
                Documentation
              </button>
              <button
                onClick={() => navigate('/community')}
                className='text-gray-400 hover:text-gray-300 text-sm w-full text-left transition-colors'>
                Community
              </button>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-700 my-6'></div>
        <div className='max-w-7xl mx-auto text-center'>
          <p className='text-gray-400 text-xs'>
            © 2024 Sticky Memo. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
