import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bgOne: '#313338',
        bgTwo: '#1A1D1F',
        bgThird: '#1A1D1F',
        bgMain: '#27292D',
        bgBtn: '#252EFF',
        bgHov: '#152955',
      },
    },
  },
  plugins: [],
}
export default config
