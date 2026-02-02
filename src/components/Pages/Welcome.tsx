import { motion } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  Lock,
  Plus,
  Shield,
  Star,
  Users,
} from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../custom/theme-provider';

const WelcomePage = () => {
  const { theme } = useTheme();

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

  return (
    <div
      className={`min-h-full transition-colors duration-500 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-zinc-800 via-gray-800 to-zinc-900 text-white'
          : 'bg-gradient-to-br from-blue-100 to-blue-200 text-gray-900'
      }`}
    >
      <div className="relative z-10 px-8 py-12 max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
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
                <Shield className="relative h-20 w-20 mx-auto text-blue-500 mb-2" />
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
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomePage;
