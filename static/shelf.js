import fs from 'fs'
import axios from 'axios'
//
import {
    isInDevMode,
    isInOfflineDevMode
} from '../src/utils/config';
import {
    getParentOfResource,
    getResourceName
} from "../src/utils/url_utils";

export const getShelfRoutes = async () => {
    const pagesPath = `src/data/shelf/${isInDevMode() ? "dev" : "production"}/pages/`
    const pageFileNames = fs.readdirSync(pagesPath)
    return Promise.all(pageFileNames.map(pageFileName =>
        mapPageFileToRoute(pagesPath, pageFileName)
    ))
}

const loadResource = async resourcePath => {
    if (resourcePath.startsWith("http")) {
        const {
            data
        } = await axios.request(resourcePath)
        return data
    } else return fs.readFileSync(resourcePath, {
        encoding: "utf-8"
    })
}

const mapPageFileToRoute = async (pageFileDir, pageFileName) => {
    console.log(`Loading page from ${pageFileName}`)
    if (pageFileName.endsWith(".md")) return await mapMarkdownPageFileToRoute(pageFileDir, pageFileName)
    if (pageFileName.endsWith(".jsx")) return mapJSXPageFileToRoute(pageFileDir, pageFileName)
    if (pageFileName.endsWith(".json")) return mapJSONFileToRoute(pageFileDir, pageFileName)
}

const mapMarkdownPageFileToRoute = async (pageFileDir, pageFileName) => {
    const pageFilePath = pageFileDir + "/" + pageFileName
    const pageName = pageFileName.replace(".md", "")
    const pageContent = await loadResource(pageFilePath)
    return {
        path: `/${pageName}`,
        component: "src/containers/shelf-pages/MarkdownShelfPage",
        getData: () => ({
            itemName: pageName,
            content: pageContent
        })
    }
}

const mapJSXPageFileToRoute = (pageFileDir, pageFileName) => {
    const pageFilePath = pageFileDir + "/" + pageFileName
    return {
        path: `/${pageFileName.replace(".jsx", "")}`,
        component: pageFilePath.replace("../../", "")
    }
}

const mapJSONFileToRoute = async (pageFileDir, pageFileName) => {
    const pageFilePath = pageFileDir + "/" + pageFileName
    const pageFileContent = await loadResource(pageFilePath)
    const page = JSON.parse(pageFileContent)
    const pageName = pageFileName.replace(".json", "")

    if (page.type === "external") {
        if (isInOfflineDevMode()) return {
            path: `/${pageName}`
        }
        const externalPageRoute = await mapPageFileToRoute(
            getParentOfResource(page.resource),
            getResourceName(page.resource)
        )
        return modifyExternalRouteToMatchLocalPageData(externalPageRoute, pageName)
    } 
    else if (page.type === "redirect") {
        return {
            path: `/${pageName}`,
            component: `src/heads/RedirectHead`,
            getData: () => ({
                target: page.target
            })
        }
    }
    else {
        console.error(`Page with file ${pageFileName} has an invalid type: ${page.type}`)
    }
}

const modifyExternalRouteToMatchLocalPageData = (externalPageRoute, pageName) => {
    externalPageRoute.path = `/${pageName}`
    const externalGetData = externalPageRoute.getData
    externalPageRoute.getData = () => {
        const externalData = externalGetData()
        externalData.itemName = pageName
        return externalData
    }
    return externalPageRoute
}
