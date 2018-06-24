import axios from "axios";
import {
    metaRepo
} from './config'
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
        const rqResult = await (axios.get(rawFileUrlFrom(metaRepo(), `records/${repoData.name}.json`))
            .catch(err => {}))
        if (rqResult && rqResult.status === 200) {
            console.log(`Loaded metadata for repo '${repoData.name}'`)
            repoData.metaData = rqResult.data
        } else setDefaultMetadataToRepo(repoData)
        repoData.metaData.statusValue = repoStatusPrecedence[repoData.metaData.status]
    }))
}

export const getReposData = async () => {
    const githubData = await getGithubApiData()
    await loadRepoMetadataInto(githubData)
    githubData.repositories.nodes = githubData.repositories.nodes.sort(compareReposByStatus)
    return githubData
}
