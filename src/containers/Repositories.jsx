import React from 'react'
import {withRouteData} from 'react-static';
import ReactMarkdown from 'react-markdown'
//
import "../scss/components/table.scss"
import "../scss/pages/repos.scss"
import {
    compareRepos
} from "../../src/utils/repo_utils"
import StandardPage from '../pages/StandardPage'
import Link from '../components/Link';
import ListItem2 from '../components/ListItem2'
import Table from '../components/Table';

export default withRouteData(({repositories, pinnedRepositories, metaData}) => (
    <StandardPage
        breadcrumbs={["repos"]}
        keywords={["projects", "repos", "repositories", "git", "github"]}
        description={"A list of my GitHub repositories"}>
        <Table
            headings={["Name", "Status", "Last Update", "Description"]}
            rows={
                repositories.nodes.sort(compareRepos).map(repo => {
                    const meta = repo.metaData || {status: "?"}
                    return [
                        <Link to={repo.webUrl}>{repo.owner.login}/{repo.name}</Link>,
                        <ListItem2
                            text1={meta.status}
                            text2={meta.statusValue} />,
                        <ListItem2
                            text1={new Date(repo.updatedAt).toLocaleDateString("en-US")} //I have to do this (new Date) here because for some reaon I can't do it in the static script
                            text2={new Date(repo.updatedAt).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})} />,
                        <ReactMarkdown source={repo.description} />
                    ]
                })
            } />
    </StandardPage>
))