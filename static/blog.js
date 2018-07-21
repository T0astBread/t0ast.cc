import axios from 'axios'
import { isInOfflineDevMode } from '../src/utils/config'
import {
    blogRepo as blogRepoConf
} from './config'
import {
    rawFileUrlFrom,
    apiUrlForRepoFrom,
    websiteUrlFrom
} from './github'


const blogRepo = blogRepoConf()

const TOC_URL = rawFileUrlFrom(blogRepo, "table_of_contents.json")


const offlineResult = []

export const getBlogPosts = async () => {
    if(isInOfflineDevMode()) return offlineResult

    const {
        data: toc
    } = await axios.get(TOC_URL)

    let index = 1
    return Promise.all(toc.posts.map(async postMeta => {
        const {
            data: postText
        } = await axios.get(rawFileUrlFrom(blogRepo, `posts/${postMeta.filename}`))
        const title = /^# (.+$)/m.exec(postText)[1]
        const body = postText.replace(/^# .+\n/, "")

        const {
            data: postCommits
        } = await axios.get(apiUrlForRepoFrom(blogRepo, `commits?path=/posts/${postMeta.filename}`))
        const lastEditDate = postCommits
            .map(commit => commit.commit.author.date)
            .map(commitDate => new Date(commitDate))
            .sort()[0]
            .toLocaleString("en-US")

        return {
            id: postMeta.filename.replace(".md", ""),
            title,
            tags: postMeta.tags,
            lastEditDate,
            body,
            githubUrl: websiteUrlFrom(blogRepo, `posts/${postMeta.filename}`)
        }
    }))
    return posts
}
