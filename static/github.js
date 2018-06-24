import axios from 'axios'
import {
    githubBearer
} from './config'

export const rawFileUrlFrom = (repo, path) => `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/master/${path}`
export const apiUrlForRepoFrom = (repo, path) => `https://api.github.com/repos/${repo.owner}/${repo.name}/${path}`
export const websiteUrlFrom = (repo, path) => `https://github.com/${repo.owner}/${repo.name}/blob/master/${path}`

export const graphQlRequest = query => {
    return axios.post("https://api.github.com/graphql", `{\"query\": \"${query.replace(/\n|\s{2,}/g, " ")}\"}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${githubBearer()}`
        }
    })
}
