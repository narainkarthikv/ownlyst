import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for individual users and small projects',
    features: [
      { label: 'Up to 100 notes', included: true },
      { label: 'Basic views (Notes & Table)', included: true },
      { label: 'Color coding', included: true },
      { label: 'Basic search', included: true },
      { label: 'Mobile access', included: true },
      { label: 'Cloud sync', included: false },
      { label: 'Advanced views', included: false },
      { label: 'Team sharing', included: false },
      { label: 'Priority support', included: false },
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '9.99',
    description: 'Ideal for professionals and power users',
    features: [
      { label: 'Unlimited notes', included: true },
      { label: 'All views (Notes, Kanban, Table, Timeline)', included: true },
      { label: 'Advanced color coding & tags', included: true },
      { label: 'Advanced search & filters', included: true },
      { label: 'Mobile access', included: true },
      { label: 'Cloud sync', included: true },
      { label: 'Export options', included: true },
      { label: 'Limited sharing (up to 3 users)', included: true },
      { label: 'Email support', included: true },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Team',
    price: '19.99',
    description: 'Best for teams and organizations',
    features: [
      { label: 'Everything in Pro', included: true },
      { label: 'Unlimited team members', included: true },
      { label: 'Team workspaces', included: true },
      { label: 'Advanced permissions', included: true },
      { label: 'Audit logs', included: true },
      { label: 'SSO integration', included: true },
      { label: 'API access', included: true },
      { label: 'Custom branding', included: true },
      { label: 'Priority support', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Choose the perfect plan for you or your team. All plans include a 14-day free trial.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative bg-white rounded-2xl p-8 shadow-lg border ${
                plan.popular ? 'border-blue-500' : 'border-gray-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-blue-500 text-white text-sm font-bold px-8 py-2 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature.label}
                    className="flex items-center text-gray-700"
                  >
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 mr-2 flex-shrink-0" />
                    )}
                    <span
                      className={
                        feature.included ? 'text-gray-900' : 'text-gray-500'
                      }
                    >
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-xl font-bold text-center ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } transition-colors duration-200`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">
              Got questions? We've got answers.
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-lg font-bold mb-2">Can I switch plans later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-lg font-bold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-lg font-bold mb-2">Is there a long-term contract?</h3>
              <p className="text-gray-600">
                No, all our plans are month-to-month with no long-term commitment. You can cancel anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

    </div>
  );
}