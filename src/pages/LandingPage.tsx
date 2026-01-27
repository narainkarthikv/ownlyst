import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Lock,
  Database,
  Download,
  Zap,
  Heart,
  Shield,
  Coffee,
} from 'lucide-react';
import Logo from '../components/Logo';

const features = [
  {
    icon: <Lock className='w-10 h-10 text-blue-600 dark:text-blue-400' />,
    title: 'Your Notes, Your Device',
    desc: 'No sneaky cloud uploads. Your thoughts stay locked on your device, where they belong. Because what happens in your browser, stays in your browser! 🔒',
  },
  {
    icon: <Database className='w-10 h-10 text-green-600 dark:text-green-400' />,
    title: 'Zero Surveillance',
    desc: 'No tracking pixels. No analytics scripts. No "oops, we shared your data" moments. Just you and your notes. Forever. 🛡️',
  },
  {
    icon: <Download className='w-10 h-10 text-purple-600 dark:text-purple-400' />,
    title: 'Break Free Anytime',
    desc: 'Export everything as JSON or CSV with one click. Your data isn\'t held hostage here. Take it wherever you want! 📦',
  },
  {
    icon: <Zap className='w-10 h-10 text-amber-600 dark:text-amber-400' />,
    title: 'Blazingly Fast',
    desc: 'Instant everything. No "connecting to server" delays. No loading spinners. No excuses. Just pure speed! ⚡',
  },
  {
    icon: <Heart className='w-10 h-10 text-red-600 dark:text-red-400' />,
    title: 'Designed for Humans',
    desc: 'Clean, beautiful, and actually enjoyable to use. No clutter, no ads, no dark patterns trying to trick you. ✨',
  },
  {
    icon: <Shield className='w-10 h-10 text-cyan-600 dark:text-cyan-400' />,
    title: 'Open & Honest',
    desc: 'Open source code you can read and trust. No secrets, no hidden agendas. Just transparent, ethical software. 💎',
  },
];

const privacyGuarantees = [
  {
    icon: '🔐',
    title: 'Lives in Your Browser',
    desc: 'Everything runs on YOUR device. We just hand you the app, then step away. Like a good friend who knows when to give you space.',
  },
  {
    icon: '📱',
    title: 'Stored 100% Locally',
    desc: 'Your browser has a built-in vault for your notes. We never touch it, see it, or even know it exists. That\'s the way it should be!',
  },
  {
    icon: '🚫',
    title: 'Zero Server Uploads',
    desc: 'After you open the app, your notes NEVER leave your device. Not once. Not even a tiny bit. Promise!',
  },
  {
    icon: '✂️',
    title: 'You\'re the Boss',
    desc: 'Want to export? Do it. Delete everything? Go ahead. Backup offline? Sure thing. it\'s YOUR data, so YOU make the rules.',
  },
  {
    icon: '⚡',
    title: 'Works Anywhere, Anytime',
    desc: 'Internet down? Phone in airplane mode? Stuck in a tunnel? No problem! Your notes are always accessible.',
  },
  {
    icon: '🎉',
    title: 'No Account Required',
    desc: 'No email. No password. No "verify your identity." Just open it and start writing. Revolutionary concept, right?',
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
    <div className='bg-white dark:bg-slate-900 text-gray-900 dark:text-white min-h-screen w-full overflow-x-hidden'>
      {/* Hero Section */}
      <div className='w-full min-h-[500px] px-0 py-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 relative'>
        <motion.div className='max-w-7xl mx-auto pt-10 pb-6 px-4 md:px-6 min-h-[500px] flex flex-col items-center justify-center overflow-visible'>
          {/* Logo and Brand Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex items-center mb-6 cursor-pointer hover:scale-105 transition-transform duration-200'
            onClick={() => navigate('/')}>
            <Logo size={48} />
            <h1 className='ml-3 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>
              Sticky Memo
            </h1>
          </motion.div>

          <div className='w-full flex flex-col items-center justify-center text-center'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900 dark:text-white'>
              Notes That Stay<br />
              <span className='text-blue-600 dark:text-blue-400'>Truly Private</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className='mb-6 text-gray-600 dark:text-gray-300 font-normal text-lg md:text-xl max-w-[560px]'>
              Write freely, knowing your thoughts are yours alone. <span className='font-semibold'>No cloud. No tracking.</span> Just honest, local-first note-taking. 🌱
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className='flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 justify-center'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className='font-bold text-base px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 shadow-md'
                onClick={() => navigate('/app')}>
                Start Taking Notes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className='font-bold text-base px-8 py-3 rounded-lg border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200'
                onClick={() => scrollToSection('privacy')}>
                How It Works
              </motion.button>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className='inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-full px-4 py-2 text-green-700 dark:text-green-300 text-sm font-medium'>
              <Shield className='w-4 h-4' />
              <span>Built by privacy lovers, for privacy lovers 💚</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Privacy Guarantee Section */}
      <div id='privacy' className='max-w-7xl mx-auto py-16 md:py-20 px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h3 className='text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white'>
            Why Your Privacy is Actually Safe Here 🛡️
          </h3>
          <p className='text-gray-600 dark:text-gray-300 text-lg max-w-[600px] mx-auto'>
            Unlike most apps that promise privacy but store everything on their servers, we literally CAN'T see your notes. Here's the real deal:
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {privacyGuarantees.map((guarantee, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className='bg-gray-50 dark:bg-slate-800 rounded-lg p-6 border border-gray-200 dark:border-slate-700 hover:shadow-md dark:hover:shadow-slate-900/50 transition-shadow'>
              <div className='text-4xl mb-3'>{guarantee.icon}</div>
              <h4 className='text-lg font-bold mb-2 text-gray-900 dark:text-white'>
                {guarantee.title}
              </h4>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                {guarantee.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className='max-w-7xl mx-auto py-16 md:py-20 px-4 md:px-6 bg-gray-50 dark:bg-slate-800/50 rounded-lg'>
        <div className='text-center mb-12'>
          <h3 className='text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white'>
            Everything You Need, Nothing You Don't ✨
          </h3>
          <p className='text-gray-600 dark:text-gray-300 text-lg max-w-[600px] mx-auto'>
            No bloat. No nonsense. No data mining disguised as "features." Just pure, honest note-taking.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className='bg-white dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600'>
              <div className='mb-4'>{feature.icon}</div>
              <h4 className='text-lg font-bold mb-2 text-gray-900 dark:text-white'>
                {feature.title}
              </h4>
              <p className='text-gray-600 dark:text-gray-300 text-sm'>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Portability Section */}
      <div className='max-w-7xl mx-auto py-16 md:py-20 px-4 md:px-6'>
        <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-8 md:p-10'>
          <div className='flex flex-col md:flex-row items-start gap-8'>
            <div className='flex-1'>
              <h3 className='text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
                No Data Hostage Situations 🔓
              </h3>
              <p className='text-gray-700 dark:text-gray-300 mb-4 text-base leading-relaxed'>
                Tired of apps that make it impossible to leave? We're different. Your data walks out with you, any time you want. No "export premium" upgrade required.
              </p>
              <ul className='space-y-3 mb-6'>
                <li className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                  <span className='text-blue-600 dark:text-blue-400 font-bold text-lg mt-0'>✓</span>
                  <span><strong>Export as JSON</strong> for backup or migration</span>
                </li>
                <li className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                  <span className='text-blue-600 dark:text-blue-400 font-bold text-lg mt-0'>✓</span>
                  <span><strong>Export as CSV</strong> to use in spreadsheets</span>
                </li>
                <li className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                  <span className='text-blue-600 dark:text-blue-400 font-bold text-lg mt-0'>✓</span>
                  <span><strong>Import</strong> from backups or other apps</span>
                </li>
                <li className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                  <span className='text-blue-600 dark:text-blue-400 font-bold text-lg mt-0'>✓</span>
                  <span><strong>Delete anytime</strong> with no questions asked</span>
                </li>
              </ul>
            </div>
            <div className='flex-1 flex items-center justify-center'>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className='text-6xl'>
                📦
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Transparency Section */}
      <div className='max-w-7xl mx-auto py-16 md:py-20 px-4 md:px-6 bg-gray-50 dark:bg-slate-800/50 rounded-lg'>
        <div className='text-center mb-12'>
          <h3 className='text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white'>
            The Nerdy Details (For Those Who Care) 🤓
          </h3>
          <p className='text-gray-600 dark:text-gray-300 text-lg max-w-[600px] mx-auto'>
            Want to know EXACTLY how we keep your data private? Here's the honest technical breakdown:
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='bg-white dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600'>
            <h4 className='text-xl font-bold mb-4 text-gray-900 dark:text-white'>Where Your Notes Actually Live 🏠</h4>
            <ul className='space-y-3 text-gray-700 dark:text-gray-300'>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 dark:text-blue-400 mt-1'>→</span>
                <span><strong>In Your Browser's Vault:</strong> Built-in storage that only YOU can access</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 dark:text-blue-400 mt-1'>→</span>
                <span><strong>On Your Device:</strong> Whether it's your laptop, phone, or tablet</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-blue-600 dark:text-blue-400 mt-1'>→</span>
                <span><strong>NOT on Our Servers:</strong> Seriously, we have no database. Nothing to hack! 🎉</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='bg-white dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600'>
            <h4 className='text-xl font-bold mb-4 text-gray-900 dark:text-white'>What We Don't Do (Promise!) 🙅</h4>
            <ul className='space-y-3 text-gray-700 dark:text-gray-300'>
              <li className='flex items-start gap-2'>
                <span className='text-red-600 dark:text-red-400 mt-1'>✗</span>
                <span><strong>Zero Tracking:</strong> No sneaky pixels watching your every move</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-red-600 dark:text-red-400 mt-1'>✗</span>
                <span><strong>Zero Analytics:</strong> We don't care what you write or when you write it</span>
              </li>
              <li className='flex items-start gap-2'>
                <span className='text-red-600 dark:text-red-400 mt-1'>✗</span>
                <span><strong>Zero Ads:</strong> No selling your attention to the highest bidder</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className='py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white'>
        <div className='max-w-4xl mx-auto text-center'>
          <h3 className='text-3xl md:text-4xl font-bold mb-4'>
            Ready to Write Without Worries? 📝
          </h3>
          <p className='mb-8 text-white/90 text-lg'>
            Join thousands who have switched to truly private note-taking. No signup. No surveillance. No surprises.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className='font-bold text-base px-8 py-3 rounded-lg bg-white text-blue-600 hover:bg-gray-50 transition-colors duration-200 shadow-lg'
              onClick={() => navigate('/app')}>
              Open Sticky Memo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className='font-bold text-base px-8 py-3 rounded-lg border-2 border-white text-white hover:bg-white/10 transition-colors duration-200'
              onClick={() => scrollToSection('privacy')}>
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Support Section */}
      <div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 py-16 md:py-20 px-4 md:px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <Coffee className='w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400' />
            <h3 className='text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white'>
              Love Privacy-First Software? ☕
            </h3>
            <p className='text-gray-700 dark:text-gray-300 mb-8 text-lg max-w-2xl mx-auto'>
              Building ethical, privacy-respecting software takes time and coffee (lots of coffee). If Sticky Memo makes your life easier, consider buying us a cup! Every bit helps keep this project independent and ad-free. 💚
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
              <motion.a
                href='https://ko-fi.com/wisdomfox'
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className='inline-flex items-center gap-2 font-bold text-base px-8 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 shadow-lg'>
                <Coffee className='w-5 h-5' />
                Buy Us a Coffee on Ko-fi
              </motion.a>
              <motion.a
                href='https://patreon.com/user?u=72747187'
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className='inline-flex items-center gap-2 font-bold text-base px-8 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 transition-colors duration-200 shadow-lg'>
                <Heart className='w-5 h-5' />
                Support on Patreon
              </motion.a>
            </div>
            <p className='mt-6 text-sm text-gray-600 dark:text-gray-400'>
              ✨ Donations are optional and never required. Sticky Memo will always be free and open source!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className='bg-gray-900 dark:bg-black text-white py-10 px-4 md:px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8'>
            <div>
              <div className='flex items-center mb-3'>
                <Logo size={32} />
                <h4 className='text-blue-400 text-xl font-bold ml-2'>Sticky Memo</h4>
              </div>
              <p className='text-gray-400 text-sm max-w-xs'>
                Privacy-first notes that actually respect you. 💚
              </p>
            </div>
            <div className='text-gray-400 text-sm space-y-1'>
              <p>✓ No accounts, ever</p>
              <p>✓ No tracking, never</p>
              <p>✓ No data mining, not even a little</p>
            </div>
          </div>
          <div className='border-t border-gray-700 pt-6'>
            <p className='text-gray-400 text-xs text-center'>
              © 2026 Sticky Memo. Made with 💚 by people who care about your privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
