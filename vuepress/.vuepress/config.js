module.exports = {
    title: 'pbmock',
    description: 'mock data from your proto file',
    dest: './docs',   // 设置输出目录
    themeConfig:{
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Github', link: 'https://git.code.oa.com/jacksonzeng/pbmock' },
        { text: 'VuePress', link: 'https://vuepress.vuejs.org/' },
      ],
      sidebar: [
        '/configDocs/',
        // '/page-a',
        // ['/page-b', 'Explicit link text']
      ]
      // '/configDocs/': [
      //   {
      //     title: '开发指南',
      //     collapsable: true,
      //     // children: [
      //     //   '/configDocs/quickStart',
      //     // ]
      //   },
      // ]
    }

  }