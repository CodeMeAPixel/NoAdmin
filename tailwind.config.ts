import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'slideDown': 'slideDown 200ms cubic-bezier(0.87, 0, 0.13, 1)',
        'slideUp': 'slideUp 200ms cubic-bezier(0.87, 0, 0.13, 1)',
      },
      keyframes: {
        slideDown: {
          'from': { height: '0', opacity: '0' },
          'to': { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        slideUp: {
          'from': { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          'to': { height: '0', opacity: '0' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
