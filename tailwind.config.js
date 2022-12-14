/*
 * @Author: 清羽
 * @Date: 2022-12-10 01:52:49
 * @LastEditTime: 2022-12-14 21:30:20
 * @LastEditors: you name
 * @Description: 
 */
module.exports = {
  // Tree-shake unused styles in production build
  // purge: ['./src/**/*.{vue,js,ts,jsx,tsx,html}'],
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'bgColor': '#f5f5f5',
        'Bluck': '#2a2e33',
        'goldenFont': '#d4ac63',
        'orange-50': "#fff7ed",
        'orange-100': "#ffedd5",
        'orange-200': "#fed7aa",
        'orange-300': "#fdba74",
        'orange-400': "#fb923c",
        'orange-500': "#f97316",
        'orange-600': "#ea580c",
        'orange-700': "#c2410c",
        'orange-800': "#9a3412",
        'orange-900': "#7c2d12",
        'selectText': '#0022ab',
        'selectBG': '#eaeeff',
      },

    },

    // Disable breakpoints
    screen: {},

  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
  corePlugins: {//禁用一些小程序class不支持的分割
    space: false,
    divideWidth: false,
    divideColor: false,
    divideStyle: false,
    divideOpacity: false,
  }
}
