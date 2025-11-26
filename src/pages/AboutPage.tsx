import { motion } from 'framer-motion';
import { Target, Heart, Coffee, Globe } from 'lucide-react';

const values = [
  {
    icon: <Target className='w-8 h-8 text-blue-600' />,
    title: 'Mission',
    description:
      'To empower teams and individuals with intuitive tools that transform how they organize and share ideas.',
  },
  {
    icon: <Heart className='w-8 h-8 text-red-600' />,
    title: 'Values',
    description:
      'We believe in simplicity, transparency, and putting our users first in everything we do.',
  },
  {
    icon: <Coffee className='w-8 h-8 text-yellow-600' />,
    title: 'Culture',
    description:
      'Built by a remote-first team that values creativity, diversity, and work-life balance.',
  },
  {
    icon: <Globe className='w-8 h-8 text-green-600' />,
    title: 'Impact',
    description:
      'Making productivity tools accessible to teams worldwide while maintaining environmental responsibility.',
  },
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO',
    image:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Emma Thompson',
    role: 'Head of Design',
    image:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'David Kim',
    role: 'Head of Product',
    image:
      'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const stats = [
  { label: 'Active Users', value: '100k+' },
  { label: 'Countries', value: '150+' },
  { label: 'Team Size', value: '45+' },
  { label: 'Notes Created', value: '10M+' },
];

export default function AboutPage() {
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
              Our Story
            </h1>
            <p className='text-xl text-white/90 max-w-3xl mx-auto'>
              Building the future of digital note-taking and team collaboration
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Story Section */}
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-6'>About Sticky Memo</h2>
          <p className='text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto'>
            Founded in 2024, Sticky Memo began with a simple mission: to make
            digital note-taking as intuitive as using physical sticky notes, but
            with the power of modern technology. What started as a simple tool
            has grown into a comprehensive platform used by teams worldwide.
          </p>
        </motion.div>

        {/* Company Values */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-20'>
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className='bg-white rounded-xl p-6 shadow-lg'>
              <div className='mb-4'>{value.icon}</div>
              <h3 className='text-xl font-bold mb-2'>{value.title}</h3>
              <p className='text-gray-600'>{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='bg-blue-50 rounded-2xl p-8 mb-20'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat) => (
              <div key={stat.label} className='text-center'>
                <div className='text-3xl font-bold text-blue-600 mb-2'>
                  {stat.value}
                </div>
                <div className='text-gray-600'>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center'>
          <h2 className='text-3xl font-bold mb-12'>Meet Our Team</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className='text-center'>
                <img
                  src={member.image}
                  alt={member.name}
                  className='w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg'
                />
                <h3 className='font-bold text-lg mb-1'>{member.name}</h3>
                <p className='text-gray-600'>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Join Us Section */}
      <div className='bg-gray-100 py-20'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center'>
            <h2 className='text-3xl font-bold mb-6'>Join Our Team</h2>
            <p className='text-gray-600 mb-8 max-w-2xl mx-auto'>
              We're always looking for talented individuals who are passionate
              about building great products and making a difference.
            </p>
            <button className='bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors'>
              View Open Positions
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
