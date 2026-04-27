import type { Transition, Variants } from "framer-motion";

export const easeOutQuint: Transition["ease"] = [0.22, 1, 0.36, 1];

export const sectionViewport = { once: true, amount: 0.28 };

export const fadeInUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: easeOutQuint },
  },
});

export const fadeIn = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, delay, ease: easeOutQuint },
  },
});
