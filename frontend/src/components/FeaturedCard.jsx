import { motion, AnimatePresence } from 'framer-motion'
// Components/FeatureCard.jsx
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.2 }}
      className="p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <Icon className="w-12 h-12 mb-4 text-purple-400" />
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  ) 

  export default FeatureCard;