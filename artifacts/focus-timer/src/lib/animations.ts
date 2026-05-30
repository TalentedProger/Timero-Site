// Optimized animation configurations for smooth, pleasant interactions
// Using cubic-bezier easing functions for natural motion

export const animations = {
  // Button interactions - quick and responsive
  button: {
    hover: { scale: 1.05, transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] } },
    tap: { scale: 0.95, transition: { duration: 0.1, ease: [0.34, 1.56, 0.64, 1] } },
  },

  // Small button interactions - slightly more subtle
  smallButton: {
    hover: { scale: 1.08, transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] } },
    tap: { scale: 0.92, transition: { duration: 0.1, ease: [0.34, 1.56, 0.64, 1] } },
  },

  // Card/background item interactions
  card: {
    hover: { scale: 1.02, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
    tap: { scale: 0.98, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } },
  },

  // Modal/panel entrance
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },

  // Backdrop fade
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },

  // Gallery entrance
  gallery: {
    initial: { opacity: 0, scale: 0.98, y: 15 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.98, y: 10 },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },

  // Spring animation for panels
  spring: {
    type: "spring" as const,
    damping: 28,
    stiffness: 320,
  },
};

// Easing functions
export const easings = {
  // Smooth ease out - good for entrances
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  
  // Bouncy ease - good for interactive elements
  bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  
  // Smooth ease in-out - good for transitions
  easeInOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
};
