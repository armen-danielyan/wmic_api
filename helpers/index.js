parseCmdResult = cmdOutput => {
    const lines = cmdOutput.split('\n');

    if(lines.length < 2) {
        throw new Error('Something went wrong!');
    }

    const output = [];
    const keys = lines[1].split('@#$#@');

    for(let i = 2; i < lines.length; i++) {
        let line = lines[i];

        if(!line) continue;

        let fields = lines[i].split('@#$#@').reduce((acc, item, i) => {
            acc[keys[i]] = item;
            return acc;
        }, {});

        output.push(fields);
    }

    return output;
};

module.exports = {
    parseCmdResult
};