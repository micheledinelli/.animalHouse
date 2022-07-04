const request = require('request');

const getRandPw = async () => {
    return new Promise((res, rej) => {
        request('https://zoo-animal-api.herokuapp.com/animals/rand', function (error, response, body) {
            if (response.statusCode == 200) {
                const data = JSON.parse(response.body);
                const rand = (data.name.split(" ").join(""));
                return(rand);
            } else {
                return(null);
            }
        })
    })
}

module.exports = { getRandPw }

