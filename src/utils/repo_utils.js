export const repoStatusPrecedence = {
    "shipped": 100,
    "finished": 90,
    "unpolished": 80,
    "ongoing-support": 75,
    "active-development": 70,
    "development": 60,
    "ehh": 20,
    "?": 10,
    null: 9,
    "dead": 0
}

export const compareReposByStatus = (repoA, repoB) =>
    repoStatusPrecedence[repoB.metaData.status] - repoStatusPrecedence[repoA.metaData.status]

export const compareReposByDate = (repoA, repoB) =>
    new Date(repoB.updatedAt).valueOf() - new Date(repoA.updatedAt).valueOf()

export const compareReposByName = (repoA, repoB) =>
    repoA.name.localeCompare(repoB.name)

export const compareRepos = (repoA, repoB) => {
    const statusComparison = compareReposByStatus(repoA, repoB)
    if(statusComparison !== 0) return statusComparison
    const dateComparison = compareReposByDate(repoA, repoB)
    if(dateComparison !== 0) return dateComparison
    const nameComparison = compareReposByName(repoA, repoB)
    return nameComparison
}