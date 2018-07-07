import dotenv from 'dotenv'

export const isInDevMode = () => process.env.NODE_ENV !== "production"
export const isInOfflineDevMode = () => process.env.NODE_ENV === "offline-dev"

export const githubBearer = () => isInDevMode() ?
    process.env.T0AST_CC__DEV__GITHUB_BEARER :
    process.env.T0AST_CC__PRODUCTION__GITHUB_BEARER

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
    if(!githubBearer()) throw new Error("No GitHub bearer token was found! Please set the T0AST_CC__DEV__GITHUB_BEARER or T0AST_CC__PRODUCTION__GITHUB_BEARER environment variables, respectively.")
}

const initialize = () => {
    loadDotEnv()
    runConfigChecks()
}
initialize()
