import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, MessageCircle, Send } from 'lucide-react';

const contactMethods = [
  {
    icon: <Mail className='w-6 h-6 text-blue-600' />,
    title: 'Email',
    description: 'Our team typically responds within 2 hours',
    value: 'support@stickymemo.com',
  },
  {
    icon: <Phone className='w-6 h-6 text-blue-600' />,
    title: 'Phone',
    description: 'Mon-Fri from 8am to 5pm PST',
    value: '+1 (555) 123-4567',
  },
  {
    icon: <MessageCircle className='w-6 h-6 text-blue-600' />,
    title: 'Live Chat',
    description: 'Available 24/7 for quick support',
    value: 'Open Chat',
  },
  {
    icon: <MapPin className='w-6 h-6 text-blue-600' />,
    title: 'Office',
    description: 'San Francisco, CA',
    value: '123 Tech Street, Suite 100',
  },
];

export default function ContactPage() {
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
              Get in Touch
            </h1>
            <p className='text-xl text-white/90 max-w-3xl mx-auto'>
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Methods Grid */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className='bg-white rounded-xl p-6 shadow-lg'>
              <div className='flex items-center mb-4'>
                {method.icon}
                <h3 className='text-lg font-bold ml-3'>{method.title}</h3>
              </div>
              <p className='text-gray-600 text-sm mb-2'>{method.description}</p>
              <p className='font-medium text-blue-600'>{method.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='bg-white rounded-2xl p-8 md:p-12 shadow-lg'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>Send us a Message</h2>
            <p className='text-gray-600'>
              Fill out the form below and we'll get back to you shortly.
            </p>
          </div>

          <form className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  First Name
                </label>
                <input
                  type='text'
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='John'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Last Name
                </label>
                <input
                  type='text'
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Doe'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email
              </label>
              <input
                type='email'
                className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='john@example.com'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Subject
              </label>
              <input
                type='text'
                className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='How can we help?'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Message
              </label>
              <textarea
                rows={6}
                className='w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Your message...'
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center'>
              Send Message
              <Send className='w-5 h-5 ml-2' />
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className='bg-gray-100 py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-gray-600'>
              Find quick answers to common questions
            </p>
          </motion.div>

          <div className='space-y-6'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='bg-white rounded-xl p-6 shadow-md'>
              <h3 className='font-bold mb-2'>What are your support hours?</h3>
              <p className='text-gray-600'>
                Our email and chat support is available 24/7. Phone support is
                available Monday through Friday, 8am to 5pm PST.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='bg-white rounded-xl p-6 shadow-md'>
              <h3 className='font-bold mb-2'>
                What's your typical response time?
              </h3>
              <p className='text-gray-600'>
                We aim to respond to all inquiries within 2 hours during
                business hours. Complex issues may take longer to resolve.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
