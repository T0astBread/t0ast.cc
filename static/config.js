import dotenv from 'dotenv'
import { isInDevMode, isInOfflineDevMode } from '../src/utils/config'

export const githubBearer = () => isInDevMode() ?
    process.env.GITHUB_BEARER__DEV :
    process.env.GITHUB_BEARER__PRODUCTION

export const blogRepo = () => isInDevMode() ? {
    owner: "TestBread",
    name: "notblog"
} : {
    owner: "T0astBread",
    name: "blog"
}

export const metaRepo = () => isInDevMode() ? {
    owner: "TestBread",
    name: "meta"
} : {
    owner: "T0astBread",
    name: "meta"
}


const loadDotEnv = () => {
    const loadedConfig = dotenv.config()
    if(loadedConfig.parsed) {
        if(loadedConfig.parsed.NODE_ENV)
            process.env.NODE_ENV = loadedConfig.parsed.NODE_ENV
    }
    else if(loadedConfig.error) {
        console.warn(`Couldn't load .env file: \n\t${loadedConfig.error}\n`)
    }
}

const runConfigChecks = () => {
    console.log(isInDevMode() ? "⚡️  Running in development mode" : "✔️  Running in production mode")
    if(isInOfflineDevMode()) console.log("Running in OFFLINE DEV MODE")
    if(!githubBearer()) throw new Error("No GitHub bearer token was found! Please set the GITHUB_BEARER__DEV or GITHUB_BEARER__PRODUCTION environment variables, respectively.")
}

const initialize = () => {
    loadDotEnv()
    runConfigChecks()
}
initialize()
