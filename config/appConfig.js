let appConfig = {
    port: 3000,
    allowerCorsOrigin: "*",
    environment: "dev",
    db: {
        uri: "mongodb://127.0.0.1:27017/splitBillsAppDB"
    },
    apiVersion: "/api/v1"
};

module.exports = {
    port: appConfig.port,
    allowerCorsOrigin: appConfig.allowerCorsOrigin,
    environment: appConfig.environment,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}

