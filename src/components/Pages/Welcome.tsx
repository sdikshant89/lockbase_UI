import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Key,
  Lock,
  Plus,
  Shield,
  Sparkles,
  Star,
  Users,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../custom/theme-provider';

const WelcomePage = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: Shield,
      title: 'Advanced Security',
      description:
        'Military-grade encryption and zero-knowledge architecture to keep your passwords absolutely secure.',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1,
    },
    {
      icon: Key,
      title: 'Password Generator',
      description:
        'Create strong, unique passwords with customizable length and complexity requirements.',
      color: 'from-green-500 to-emerald-500',
      delay: 0.2,
    },
    {
      icon: Zap,
      title: 'Quick Access',
      description:
        'Instantly access your passwords across all devices with seamless synchronization.',
      color: 'from-purple-500 to-pink-500',
      delay: 0.3,
    },
  ];

  const stats = [
    { number: '10M+', label: 'Passwords Secured', icon: Lock },
    { number: '500K+', label: 'Active Users', icon: Users },
    { number: '99.9%', label: 'Uptime', icon: Globe },
    { number: '4.9★', label: 'User Rating', icon: Star },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-zinc-800 via-gray-800 to-zinc-900 text-white'
          : 'bg-gradient-to-br from-blue-200 via-white to-blue-300 text-gray-900'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-green-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 px-8 py-12 max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center space-y-8">
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20 scale-[1.75]" />
                <Shield className="relative h-20 w-20 mx-auto text-blue-500 mb-6" />
              </motion.div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-6xl font-bold bg-clip-text m-0"
              >
                Welcome to
              </motion.h1>
              <h1
                className="font-semibold text-5xl md:text-6xl text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-orange-400"
                style={{ fontStretch: 'extra-expanded' }}
              >
                Lockbase
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              Your ultimate password management solution. Securely store,
              generate, and manage all your passwords with military-grade
              encryption and seamless cross-platform synchronization. Stats
              defined below are made up btw.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="generator">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Your First Password</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className={`text-center p-6 rounded-2xl ${
                  theme === 'dark'
                    ? 'bg-zinc-800/50 border border-gray-700/50'
                    : 'bg-blue-400/10 border border-gray-200/50'
                } backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
              >
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                <div className="text-2xl font-bold mb-1">{stat.number}</div>
                <div
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose LockBase?
              </h2>
              <p
                className={`text-lg ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                } max-w-2xl mx-auto`}
              >
                Discover the features that make LockBase the most trusted
                password manager
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + feature.delay, duration: 0.6 }}
                  whileHover={{
                    scale: 1.02,
                    rotate: 0.5,
                    transition: { duration: 0.2 },
                  }}
                  className={`relative p-8 rounded-2xl ${
                    theme === 'dark'
                      ? 'bg-gray-800/50 border border-gray-700/50'
                      : 'bg-white/70 border border-gray-200/50'
                  } backdrop-blur-sm hover:shadow-xl transition-all duration-300 group`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                  />

                  <div
                    className={`relative w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>

                  <p
                    className={`${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    } leading-relaxed`}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className={`relative p-12 rounded-3xl ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600'
                : 'bg-gradient-to-r from-white to-gray-50 border border-gray-200'
            } text-center overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6, type: 'spring' }}
              className="relative"
            >
              <Sparkles className="h-12 w-12 mx-auto mb-6 text-yellow-500" />
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p
                className={`text-lg mb-8 max-w-2xl mx-auto ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Join millions of users who trust LockBase to keep their digital
                lives secure. Start managing your passwords like a pro today.
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 25px 50px rgba(59, 130, 246, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center space-x-3 mx-auto"
              >
                <CheckCircle className="h-6 w-6" />
                <span>Get Started Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;
