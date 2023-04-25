interface AuthConfig {
    google_client_id: string
    google_clinet_secrect: string
}

interface AppConfig {
    auth: AuthConfig
}

function setupEnv(): AppConfig {
    // Grab env variable and throw an error if they do not exist
    const google_client_id = process.env.GOOGLE_CLIENT_ID
    const google_client_screct = process.env.GOOGLE_CLIENT_SECRET
    if (google_client_id === undefined || google_client_screct === undefined) {
        throw Error("GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRECT not found in env file.")
    }
    return { auth: { google_client_id: google_client_id, google_clinet_secrect: google_client_screct } }
}

export const appConfig = setupEnv()