'use client';
import { motion } from 'framer-motion';
import GradientText from './GradientText';

/**
 * Reusable Section Header Component
 * 
 * @param {string} badge - Badge text (e.g., "Features")
 * @param {string} title - Main title
 * @param {string} highlightedText - Text to be highlighted with gradient
 * @param {string} description - Description text
 * @param {boolean} animate - Enable animation
 * @param {string} className - Additional classes
 */
export default function SectionHeader({
  badge,
  title,
  highlightedText,
  description,
  animate = true,
  className = '',
}) {
  // Always use motion.div to avoid hydration mismatch
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  } : {};

  return (
    <motion.div
      {...animationProps}
      className={`text-center mb-6 sm:mb-8 ${className}`}
    >
      {badge && (
        <span className="inline-block px-3 py-1 bg-blue-100 text-[#2E5CB8] rounded-full text-xs font-semibold mb-2 sm:mb-3">
          {badge}
        </span>
      )}
      
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
        {title} {highlightedText && <GradientText>{highlightedText}</GradientText>}
      </h2>
      
      {description && (
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}