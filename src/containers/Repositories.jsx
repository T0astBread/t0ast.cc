import React from 'react'
import { withRouteData } from 'react-static';
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

export default withRouteData(({ repositories, pinnedRepositories, metaData }) => (
    <StandardPage>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Last Update</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {repositories.nodes.sort(compareRepos).map(repo => {
                    const meta = repo.metaData || { status: "?" }
                    return (
                        <tr key={repo.name}>
                            <td>
                                <Link to={repo.webUrl}>{repo.owner.login}/{repo.name}</Link>
                            </td>
                            <td>
                                <ListItem2
                                    text1={meta.status}
                                    text2={meta.statusValue}/>
                            </td>
                            <td>
                                <ListItem2
                                    text1={new Date(repo.updatedAt).toLocaleDateString("en-US")} //I have to do this (new Date) here because for some reaon I can't do it in the static script
                                    text2={new Date(repo.updatedAt).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})}/>
                            </td>
                            <td>
                                <ReactMarkdown source={repo.description}/>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </StandardPage>
))