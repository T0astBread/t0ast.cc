import axios from 'axios'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const RAW_REPO_URL = "https://raw.githubusercontent.com/TestBread/notblog/master"
const API_REPO_URL = "https://api.github.com/repos/TestBread/notblog"
const EDIT_REPO_URL = "https://github.com/TestBread/notblog/blob/master"
const TOC_URL = RAW_REPO_URL + "/table_of_contents.json"

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    const { data: toc } = await axios.get(TOC_URL)

    let index = 1
    const posts = await Promise.all(toc.posts.map(async postMeta => {
      const { data: postText } = await axios.get(RAW_REPO_URL + "/posts/" + postMeta.filename)
      const title = /^# (.+$)/m.exec(postText)[1]
      const body = postText.replace(/^# .+\n/, "")
      
      const { data: postCommits } = await axios.get(`${API_REPO_URL}/commits?path=/posts/${postMeta.filename}`)
      const lastEditDate = postCommits
        .map(commit => commit.commit.author.date)
        .map(commitDate => new Date(commitDate))
        .sort()
        [0]
        .toLocaleString("en-US")
        
      return {
        id: postMeta.filename.replace(".md", ""),
        title,
        tags: postMeta.tags,
        lastEditDate,
        body,
        githubUrl: `${EDIT_REPO_URL}/posts/${postMeta.filename}`
      }
    }))

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
