export const isInDevMode = () => process.env.NODE_ENV !== "production"
export const isInOfflineDevMode = () => process.env.NODE_ENV === "offline-dev"
