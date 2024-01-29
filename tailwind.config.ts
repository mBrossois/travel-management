import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        dissappear: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        }
      },
      animation: {
        appear: 'appear 1000ms ease-in-out forwards',
        dissappear: 'dissappear 300ms ease-in-out forwards',
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled', 'invalid'],
    }
  },
}
