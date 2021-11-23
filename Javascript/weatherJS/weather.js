class Weather{
    constructor(city , state){
        this.apiKey ='5e8d54e4439047ea8d54e4439077ea3b';
        this.city = city;
        this.state = state;
    }

    //fetch weather from API
    async getWeather(){
        const response = await fetch(`https://api.weather.com/v2/pws/observations/current?stationId=KMAHANOV10&format=json&units=e&apiKey=${this.apiKey}`)
        
    }
}
