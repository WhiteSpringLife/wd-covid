const request = require("request")

let url = "https://m.search.naver.com/p/csearch/content/nqapirender.nhn?where=m&pkid=9005&key=diffV2API";

module.exports = {
    run: async () => {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {

                let data = JSON.parse(body).result;
                let updatetime = data.updatetime;
                let year = data.updatetime.slice(0,5);
                let list = data.list;
                let last = list[list.length-1];
                let covidList = "누적 확진자 현황 : \`\`" + '(' + updatetime + ' 기준)' + "\`\`\n\n";
                covidList += "신규 확진자 : \`\`" + last.total.replace(",", "") + "\`\`\n";
                covidList += "국내발생 : \`\`" + last.local.replace(",", "") + "\`\`\n";
                covidList += "해외유입 : \`\`" + last.oversea.replace(",", "") + "\`\`\n\n";
                covidList += `\`\`\`md\n`;
                covidList += `# 코로나 기록\n`;
                covidList += `[날짜][신규확진자] <국내발생 해외유입>\n`;
                covidList += list.map((x) => {
                    return `[${year}${x.date}][${x.total.replace(",", "")}] <${x.local.replace(",", "")} ${x.oversea.replace(",", "")}>`;
                }).join('\n');
                covidList += `\`\`\``;
                resolve(`${covidList}`);
            })
        })
    }
}