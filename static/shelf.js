import fs from 'fs'
import {
    isInDevMode
} from '../src/utils/config';
//
import React from 'react'
import ReactMarkdown from 'react-markdown'

export const getShelfRoutes = async () => {
    const pagesPath = `src/data/shelf/${isInDevMode() ? "dev" : "production"}/pages/`
    const pageFileNames = fs.readdirSync(pagesPath)
    return pageFileNames.map(pageFileName => mapPageFileToRoute(pagesPath, pageFileName))
}

const mapPageFileToRoute = (pageFileDir, pageFileName) => {
    if (pageFileName.endsWith(".md")) return mapMarkdownPageFileToRoute(pageFileDir, pageFileName)
    if (pageFileName.endsWith(".jsx")) return mapJSXPageFileToRoute(pageFileDir, pageFileName)
}

const mapMarkdownPageFileToRoute = (pageFileDir, pageFileName) => {
    const pageFilePath = pageFileDir + pageFileName
    const pageName = pageFileName.replace(".md", "")
    return {
        path: `/${pageName}`,
        component: "src/containers/shelf-pages/MarkdownShelfPage",
        getData: () => ({
            itemName: pageName,
            content: fs.readFileSync(pageFilePath, {
                encoding: "utf-8"
            })
        })
    }
}

const mapJSXPageFileToRoute = (pageFileDir, pageFileName) => {
    const pageFilePath = pageFileDir + pageFileName
    return {
        path: `/${pageFileName.replace(".jsx", "")}`,
        component: pageFilePath.replace("../../", "")
    }
}
