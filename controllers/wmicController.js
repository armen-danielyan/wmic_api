const wmic = require('../lib/wmic'),
    helpers = require('../helpers');

module.exports = class wmicController {
    static async disks(req, res, next) {
        try {
            const { username, password, host } = req.body;
            if(!username || !password || !host) {
                throw new Error('Credentials are missing!');
            }

            const result = await wmic.discInfo(username, password, host);

            res.status(200).json({
                error: false,
                message: 'Disk Info',
                data: helpers.parseCmdResult(result)
            });
        } catch(e) {
            res.status(200).json({
                error: true,
                message: e.message
            });
        }
    }

    static async system(req, res, next) {
        try {
            const { username, password, host } = req.body;
            if(!username || !password || !host) {
                throw new Error('Credentials are missing!');
            }

            const result = await wmic.systemInfo(username, password, host);

            res.status(200).json({
                error: false,
                message: 'System Info',
                data: helpers.parseCmdResult(result)
            });
        } catch(e) {
            res.status(200).json({
                error: true,
                message: e.message
            });
        }
    }
};