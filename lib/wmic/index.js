const { spawn } = require('child_process');

module.exports = class WMIC {
    static discInfo(username, password, host) {
        const con = WMIC.connectionStr(username, password, host);

        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.run('wmic', [...con, `Select Name, FreeSpace, Size from Win32_LogicalDisk`]);
                resolve(result);
            } catch(e) {
                console.log(e);
                reject(e);
            }
        });
    }

    static systemInfo(username, password, host) {
        const con = WMIC.connectionStr(username, password, host);

        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.run('wmic', [...con, `Select * from Win32_OperatingSystem`]);
                resolve(result);
            } catch(e) {
                console.log(e);
                reject(e);
            }
        });
    }

    static connectionStr(username, password, host) {
        return [
            `--user=${username}%${password}`,
            `//${host}`,
            `--delimiter=@#$#@`
        ];
    }

    static run(_cmd, _args) {
        return new Promise((resolve, reject) => {
            const proc = spawn(_cmd, _args);

            let stdSuccess = '',
                stdError = '';

            let killProcess = setTimeout(() => {
                process.kill(proc.pid, 'SIGKILL');
            }, 10000);

            proc.stdout.on('data', chunk => {
                stdSuccess += chunk;
            });

            proc.stderr.on('data', chunk => {
                stdError += chunk;
            });

            proc.on('error', error => {
                reject(error);
            });

            proc.on('close', code => {
                clearTimeout(killProcess);
                if (code === 0) {
                    resolve(stdSuccess);
                } else {
                    reject({
                        code: code,
                        error: stdError,
                        std: stdSuccess
                    });
                }
            });
        })
    }
};