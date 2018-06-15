import axios from 'axios'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const transformFirestoreData = firestoreResponse => {
    const documents = firestoreResponse.documents
    return documents.map(document => ({
        id: document.fields.seqIndex.integerValue,
        title: document.fields.title.stringValue,
        tags: document.fields.tags.arrayValue.values.map(val => val.stringValue),
        body: document.fields.text.stringValue.replace(/\\n/g, "\n"),
        lastEditDate: new Date(document.updateTime)
    }))
}

export default {
    getSiteData: () => ({
        title: 'React Static',
    }),
    getRoutes: async () => {
        const { data: fireStoreData } = await axios.get("https://firestore.googleapis.com/v1beta1/projects/t0ast-cc/databases/(default)/documents/blogposts")
        const posts = transformFirestoreData(fireStoreData)
        return [{
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
                    posts
                }),
                children: posts.map(post => ({
                    path: `/post/${post.id}`,
                    component: 'src/containers/Post',
                    getData: () => ({
                        post
                    })
                })),
            },
            {
                is404: true,
                component: 'src/containers/404',
            },
        ]
    },
    webpack: (config, {
        defaultLoaders,
        stage
    }) => {
        let loaders = []

        if (stage === 'dev') {
            loaders = [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        } else {
            loaders = [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        minimize: stage === 'prod',
                        sourceMap: false,
                    },
                },
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: ['src/']
                    },
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

        config.module.rules = [{
            oneOf: [{
                    test: /\.s(a|c)ss$/,
                    use: loaders,
                },
                defaultLoaders.cssLoader,
                defaultLoaders.jsLoader,
                defaultLoaders.fileLoader,
            ],
        }, ]
        return config
    },
}
