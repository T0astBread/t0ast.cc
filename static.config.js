import ExtractTextPlugin from 'extract-text-webpack-plugin'
//
import setUpAxios from './static/axios_setup'
import { getBlogPosts } from './static/blog'
import { getReposData } from './static/repos'
import { getShelfRoutes } from './static/shelf';

export default {
  siteRoot: "https://t0ast.cc",
  getSiteData: () => ({
    title: 't0ast.cc',
  }),
  getRoutes: async () => {
    setUpAxios()
    
    const posts = await getBlogPosts()
    const repos = await getReposData()

    return [
      {
        path: '/',
        component: 'src/containers/Home',
        priority: 1,
      },
      {
        path: '/about',
        component: 'src/containers/About',
        priority: .5,
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        priority: .5,
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/posts/${post.id}`,
          component: 'src/containers/Post',
          priority: .25,
          getData: () => ({
            post,
          }),
        })),
      },
      {
        path: '/repos',
        component: 'src/containers/Repositories',
        getData: () => repos,
        priority: .5,
      },
      {
        path: '/shelf',
        component: 'src/containers/Shelf',
        children: await getShelfRoutes(),
        priority: .5,
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  webpack: (config, { defaultLoaders, stage }) => {
    let loaders = []

    if (stage === 'dev') {
      loaders = [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
    } else {
      loaders = [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: stage === 'prod',
            sourceMap: false,
          },
        },
        {
          loader: 'sass-loader',
          options: { includePaths: ['src/'] },
        },
      ]

      // Don't extract css to file during node build process
      if (stage !== 'node') {
        loaders = ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              sourceMap: false,
              hmr: false,
            },
          },
          use: loaders,
        })
      }
    }

    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.s(a|c)ss$/,
            use: loaders,
          },
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
    return config
  },
}
