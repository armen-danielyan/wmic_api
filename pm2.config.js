module.exports = {
    apps: [
        {
            name: 'wmic_api',
            script: './bin/www',
            watch: false,
            ignore_watch : ['node_modules'],
            watch_options: {
                followSymlinks: false
            },
            env_production: {
                NODE_ENV: 'production',
            }
        }
    ],
};
