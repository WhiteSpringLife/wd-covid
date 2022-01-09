const request = require("request")

let url = "https://m.search.naver.com/p/csearch/content/nqapirender.nhn?where=m&pkid=9005&key=diffV2API";

module.exports = {
    run: async () => {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {

                let data = JSON.parse(body).result;
                let updatetime = data.updatetime;
                let year = data.updatetime.slice(0,5);
                let covidList = "누적 확진자 현황 : \`\`" + '(' + updatetime + ' 기준)' + "\`\`\n\n";
                covidList += "신규 확진자 : \`\`" + data.data.dailyCnt[data.data.dailyCnt.length-1] + "\`\`\n";
                covidList += "7일 평균 확진자 : \`\`" + data.data.average[data.data.average.length-1] + "\`\`\n\n";
                covidList += `\`\`\`md\n`;
                covidList += `# 코로나 기록\n`;
                covidList += `[날짜][신규확진자] <7일평균확진자>\n`;
                let list = [];
                for (let i = 0; i < 7; i++) {
                    list.push(`[${year}${data.data.xAxis[i]}][${data.data.dailyCnt[i]}] <${data.data.average[i]}>`);
                }
                covidList += list.join('\n');
                covidList += `\`\`\``;
                resolve(`${covidList}`);
            })
        })
    }
}