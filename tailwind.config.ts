import type { Config } from 'tailwindcss'

const { nextui } = require('@nextui-org/react')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-Inter)', 'sans-serif']
      },
      colors: {
        headers: {
          DEFAULT: '#02416d'
        },
        primary: {
          DEFAULT: '#0f2137'
        },
        secondary: {
          DEFAULT: '#FFC400'
        },
        darkPrimary: {
          DEFAULT: '#0a5483'
        },
        bgPrimary: {
          DEFAULT: '#02416d'
        },
        whitePrimary: {
          DEFAULT: '#f8f8ec'
        },
        blackText: {
          DEFAULT: '#0f2137'
        },
        darkBg: {
          DEFAULT: '#18181b'
        }
      },
      boxShadow: {
        1: '0px 4px 20px rgba(120, 120, 120, 0.15)',
        2: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        3: '0px 1px 2px rgba(0, 0, 0, 0.25)',
        darker: '0px 20px 30px 0px rgba(59, 59, 59, 0.30)',
        container:
          '0px 3px 23px 5px rgba(120,120,120,0.2), 0px 3px 4px 0px rgba(120,120,120,0.14), 0px 1px 8px 0px rgba(120,120,120,0.12), 10px -10px 15px rgba(120,120,120,0.12)'
      },
      screens: {
        xxs: '350px',
        xs: '480px',
        ss: '620px',
        sm: '768px',
        xm: '890px',
        md: '1024px',
        lg: '1200px',
        xl: '1700px'
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar')({
      nocompatible: true,
      preferredStrategy: 'pseudoelements'
    }),
    nextui({
      themes: {
        light: {
          fontFamily: {
            inter: ['var(--font-Inter)', 'sans-serif']
          },
          colors: {
            headers: {
              DEFAULT: '#209AB0'
            },
            primary: {
              DEFAULT: '#0f2137'
            }
          }
        },
        dark: {}
      }
    })
  ]
}
export default config
