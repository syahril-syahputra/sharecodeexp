const url="https://www.exepart.com";
module.exports = {
    siteUrl: url,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
    transform: async (config, path) => {
        if (path.includes('sitemap.xml')) {
            config.siteUrl = url;
        }
        return config;
    },
};