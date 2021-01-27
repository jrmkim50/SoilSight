const config = {
    authentication: {
        options: {
            userName: "everybodyeatsAdmin",
            password: "`JRk'd#6#'$9Mr\"L" //`JRk'd#6#'$9Mr"L
        },
        type: "default"
    },
    server: "everybodyeats.database.windows.net",
    options: {
        database: "everybodyeats",
        encrypt: true
    }
};

const storageAccess = {
    storageConnectionString: "DefaultEndpointsProtocol=https;AccountName=sqlvabxzd3a6uadxds;AccountKey=tDvDZlp14FggTQuVAHD4YTZNpZf76uydGnuZTSBrxbi+W6GCBGDHB7W1QXlz+aNX58JQ+o2HcadFLN1UM9M0ww==;EndpointSuffix=core.windows.net"
}

exports.config = config;
exports.storageAccess = storageAccess;