const request = require('request');
const fs = require('fs');


const jobTitles = ['Java Developer', 'Backend Developer', 'jjhgggfg', 'Sales Executive', 'Marketing Manager']


const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const run = async () => {
    console.log('in suggestions');
    let suggestionList = [];
    for (let i = 0; i < jobTitles.length; i++) {
        let list = await new Promise((resolve, reject) => {
            request({
                method: 'GET',
                uri: `https://api-embeddedbuilder.myperfectresume.com/api/v1/content/texttunercontent?user_uid=60a39fc7-cc59-4228-a89c-825b1815f4ed&sectionTypeCD=EXPR&productCD=RWZ&Jobtitle=$${jobTitles[i]}&searchItemType=jobTitle`
            }, (err, res, body) => {
                if (err) return reject(err);
                return resolve(body)
            })
        });
        list = JSON.parse(list);

        suggestionList.push({
            [jobTitles[i]]: (list && list['result'] || []).map(data => data.text)
        })
        if (i !== 0 && i % 100 == 0) {
            console.log('sleeping');
            await sleep(2000 * 60 * 2);
            console.log('waking up');
        }
    }

    let writeStream = fs.createWriteStream('suggestions.json');

    writeStream.write(JSON.stringify(suggestionList));

    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });
}


run();