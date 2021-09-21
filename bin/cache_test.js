const request = require("request")

module.exports = {
    run: async () => {
        return new Promise((resolve, reject) => {
            let url = "https://gall.dcinside.com/board/lists?id=baseball_new10";
            request(url, (error, response, body) => {
                let gall_num = response.body.split('<td class="gall_count">-</td>')[1].split('<td class="gall_num" >')[3].split('</td>')[0];
                resolve(`${gall_num}`);
            })
        });
    }
}