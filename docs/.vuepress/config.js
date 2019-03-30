// Title:
module.exports = {
  title: 'PicoDB',
  description: 'A template for writing micro UMD Javascript libraries',
}

// Theme
module.exports = {
  themeConfig: {
    // Navbar
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/jclo/picodb' },
    ],

    // Sidebar
    sidebar: {

      // Guide
      '/guide/': [
        '',
      ],

      // fallback
      '/': [
        '',
      ]
    },

    lastUpdated: 'Last Updated', // string | boolean
  },
}
