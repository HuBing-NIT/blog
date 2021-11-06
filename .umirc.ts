import { defineConfig } from 'dumi';
// import CompressionWebpackPlugin from 'compression-webpack-plugin';
const __DEV__ = process.env.NODE_ENV === 'development';
const includePkgs = __DEV__
  ? [
      'docs',
      'packages/blogs/src',
      'packages/component/src',
      'packages/doc/src',
      'packages/learn/src',
    ]
  : [
      'docs',
      'packages/blogs/src',
      'packages/component/src',
      'packages/doc/src',
      'packages/learn/src',
    ];
export default defineConfig({
  title: '少年阿冰',
  favicon: '/assets/logo.jpg',
  logo: '/assets/logo.jpg',
  outputPath: 'docs-dist',
  // base: `/${repo}/`,
  // publicPath: `./`,
  // exportStatic: { htmlSuffix: true },
  // publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  mode: 'site',
  resolve: {
    includes: includePkgs,
  },
  hash: true,
  metas: [
    {
      name: 'keywords',
      content: 'thebing',
    },
    {
      name: 'description',
      content: '这是我自己的网站。',
    },
  ],
  navs: [
    null,
    {
      title: '联系索引',
      children: [
        { title: 'GitHub', path: '' },
        { title: 'Gitee', path: '' },
        { title: 'WeChat : 少年阿冰', path: '' },
        { title: 'QQ', path: '' },
      ],
    },
  ],
  // chainWebpack(config, { webpack }) {
  //   if (__DEV__) return;
  //   // 生产模式开启
  //   config.plugin('compression-webpack-plugin').use(
  //     new CompressionWebpackPlugin({
  //       // filename: 文件名称，这里我们不设置，让它保持和未压缩的文件同一个名称
  //       algorithm: 'gzip', // 指定生成gzip格式
  //       test: new RegExp(`.(${['js', 'css'].join('|')})$`), // 匹配哪些格式文件需要压缩
  //       threshold: 1024 * 10, //对超过10k的数据进行压缩
  //       minRatio: 0.6, // 压缩比例，值为0 ~ 1
  //     })
  //   );
  // },
  // menus: {
  //   '/components': [
  //     {
  //       title: '组件',
  //     },{
  //       title: '树形穿梭框',
  //       children: [
  //         'components/tree', 'components/treeTrsfer'
  //       ],
  //     }
  //   ],
  //   '/fun': [
  //     {
  //       title: '常用方法',
  //     },{
  //       title: '函数',
  //       children: ['fun/frequently'],
  //     }
  //   ],
  // },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  // more config: https://d.umijs.org/config
});
