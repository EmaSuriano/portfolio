/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.700'),
            pre: {
              color: theme('colors.slate.600'),
              backgroundColor: theme('colors.slate.100'),
            },
            code: {
              color: theme('colors.teal.400'),
              padding: theme('spacing.1'),
              paddingLeft: theme('spacing.2'),
              paddingRight: theme('spacing.2'),
              borderRadius: theme('spacing.1'),
              fontWeight: 600,
              color: theme('colors.slate.600'),
              backgroundColor: theme('colors.slate.100'),
            },
            'code::before': false,
            'code::after': false,
            'h1,h2,h3,h4': {
              width: '100%',
              color: theme('colors.slate.800'),
              'scroll-margin-top': theme('spacing.16'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.slate.300'),
            pre: {
              color: theme('colors.slate.200'),
              backgroundColor: theme('colors.slate.800'),
            },
            code: {
              color: theme('colors.slate.400'),
              backgroundColor: theme('colors.slate.800'),
            },
            'h1,h2,h3,h4': {
              color: theme('colors.slate.200'),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
};
