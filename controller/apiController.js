const axios = require(`axios`)

class ApiController{

    static weather(req, res, next){
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=1642911&appid=c3a18b31ec8ca0ecb32c8c9bd775713e&units=metric`)
            .then(data=>{
                let balikan = {
                    city: data.data.city.name,
                    temp: data.data.list[0].main.temp,
                    weather: data.data.list[0].weather[0].main
                }
                // console.log(data.data.city.name);
                // console.log(data.data.list[0].main.temp);
                // console.log(data.data.list[0].weather[0].main);
                res.status(200).json(balikan)
            })
            .catch(err=>{
                next(err)
            })

    }
}

module.exports = ApiController