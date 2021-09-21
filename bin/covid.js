const request = require("request")

let url = "http://ncov.mohw.go.kr/bdBoardList_Real.do?brdId=1&brdGubun=11&ncvContSeq=&contSeq=&board_id=&gubun=" //코로나바이러스감염증-19(COVID-19)

module.exports = {
    run: async () => {
        return new Promise((resolve, reject) => {
            request(url, (error, response, body) => {
                let info = '', text1 = '', text2 = '', text3 = '';

                let oversea = response.body.split('DP_data.oversea.push').slice(1, 8).map(x => x.split('("')[1].split('")')[0]); // 해외 유입
                let region = response.body.split('DP_data.region.push').slice(1, 8).map(x => x.split('("')[1].split('")')[0]); // 국내 발생
                let date = response.body.split('DP_data.date.push').slice(1, 8).map(x => x.split('("')[1].split('")')[0]); // 날짜
                let covidList = `\`\`\`md\n`;
                covidList += `# 코로나 기록\n`;
                covidList += `[날짜][신규확진자] <해외유입 국내발생>\n`;
                covidList += date.map((x, i) => {
                    if (i + 1 == date.length) {
                        info = "누적 확진자 현황 : \`\`" + '(' + x + '. 00시 기준)' + "\`\`";
                        text1 = "신규 확진자 : \`\`+ " + (parseInt(oversea[i]) + parseInt(region[i])) + "\`\`";
                        text2 = "해외유입 : \`\`" + oversea[i] + "\`\`";
                        text3 = "국내발생 : \`\`" + region[i] + "\`\`";
                    }
                    return `[2020.${x}][${parseInt(oversea[i]) + parseInt(region[i])}] <${oversea[i]} ${region[i]}>`;
                }).join('\n')
                covidList += `\`\`\``;

                resolve(`${info}\n\n${text1}\n${text2}\n${text3}\n\n${covidList}`);
            })
        });
    }
}