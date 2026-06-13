import { defineConfig, presetUno, presetAttributify, presetIcons, presetWebFonts } from 'unocss';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'Rajdhani:400;500;600;700',
        mono: 'JetBrains Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
      primary: '#E53935',
      accent: '#00E5FF',
      dark: {
        100: '#222222',
        200: '#1a1a1a',
        300: '#111111',
      },
    },
  },
  shortcuts: {
    'btn-primary': 'px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-red-700 transition-colors',
    'btn-secondary': 'px-6 py-3 bg-dark-100 text-white rounded-lg font-semibold hover:bg-dark-200 transition-colors border border-gray-700',
    'card': 'bg-dark-200 rounded-xl border border-gray-800 hover:border-primary transition-all duration-300',
    'card-hover': 'hover:shadow-[0_0_20px_rgba(229,57,53,0.3)] hover:-translate-y-1',
  },
});
