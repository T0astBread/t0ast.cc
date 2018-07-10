import axios from 'axios'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
//
import setUpAxios from './static/axios_setup'
import { getBlogPosts } from './static/blog'
import { getReposData } from './static/repos'

export default {
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
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/posts/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        path: '/repos',
        component: 'src/containers/Repositories',
        getData: () => repos
      },
      {
        path: '/shelf',
        component: 'src/containers/Shelf',
        getData: () => ({
          shelfItems: [
            {
              name: "Tweetdown",
              description: "Browser extension to enable Markdown on Twitter",
              website: "https://t0astbread.github.io/Tweetdown",
              language: {
                name: "JavaScript",
                color: "yellow"
              }
            },
            {
              name: "yBooru",
              description: "Booru aggregator",
              website: "http://localhost:3000/ybooru",
              language: {
                name: "Kotlin",
                color: "orange"
              }
            },
            {
              name: "Boneless",
              description: "Language",
              language: {
                name: "Java",
                color: "brown"
              }
            },
            {
              name: "Tweetdown",
              description: "Browser extension to enable Markdown on Twitter",
              language: {
                name: "JavaScript",
                color: "yellow"
              }
            }
          ]
        })
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
