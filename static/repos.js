import axios from "axios";
import {
    metaRepo
} from './config'
import { isInOfflineDevMode } from '../src/utils/config'
const fs = require("fs")
import {
    graphQlRequest,
    apiUrlForRepoFrom,
    rawFileUrlFrom
} from './github'
import {
    compareReposByStatus,
    repoStatusPrecedence
} from "../src/utils/repo_utils"

const getGithubApiData = async () => {
    const reposGraphQuery = fs.readFileSync("static/repos.gql").toString()
    let {
        data: githubApiData
    } = await graphQlRequest(reposGraphQuery)
    githubApiData = githubApiData.data.viewer
    githubApiData.repositories.nodes.forEach(repo => {
        // repo.updatedAt = new Date(repo.updatedAt) //For some reason this doesn't work. TODO: Make it work
        repo.webUrl = `https://github.com/${repo.owner.login}/${repo.name}`
    })
    return githubApiData
}

const setDefaultMetadataToRepo = repo => {
    repo.metaData = {
        status: "?"
    }
}

const loadRepoMetadataInto = async (githubData) => {
    return Promise.all(githubData.repositories.nodes.map(async repoData => {
        const rqResult = await (axios.get(rawFileUrlFrom(metaRepo(), `records/${repoData.owner.login}/${repoData.name}.json`))
            .catch(err => {}))
        if (rqResult && rqResult.status === 200) {
            repoData.metaData = rqResult.data
        } else setDefaultMetadataToRepo(repoData)
        repoData.metaData.statusValue = repoStatusPrecedence[repoData.metaData.status]
    }))
}


const offlineResult = {
    pinnedRepositories: {
        nodes: []
    },
    repositories: {
        nodes: []
    }
}

export const getReposData = async () => {
    if(isInOfflineDevMode()) return offlineResult

    const githubData = await getGithubApiData()
    await loadRepoMetadataInto(githubData)
    githubData.repositories.nodes = githubData.repositories.nodes.sort(compareReposByStatus)
    return githubData
}
