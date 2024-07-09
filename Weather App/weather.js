$(document).ready(function(){
    const apikey = "94d4ee4f80333618717308d409c06363";

    $("button").click(function(){
        const city = $("input").val().trim();
       
        if (city) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
          
            $.get(url, function(data){
                const cityName = data.name;
                const weather = data.weather[0].main;
                const description = data.weather[0].description;
                const temp = Math.round(data.main.temp);
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;

                $(".temp").text(`${temp}°C`);
                $(".city").text(cityName);
                $(".humidity").text(`${humidity}%`);
                $(".wind").text(`${windSpeed} km/h`);
                $(".report").text(description);

                const weatherIcon = getWeatherIcon(weather);
                $(".weather-icon").attr("src", weatherIcon);

                $(".error-message").fadeOut();
                $(".weather").slideDown();
            }).fail(function(){
                $(".weather").slideUp();
                $(".error-message").fadeIn();
            });
        } else {
            $(".error-message").text("Please enter a city name!").fadeIn();
        }
    });

    $("input").keypress(function(event){
        if (event.key === "Enter") {
            $("button").click();
        }
    });

    function getWeatherIcon(weather) {
        const icons = {
            Clear: "weather img/clear.png",
            Rain: "weather img/rain.png",
            Clouds: "weather img/clouds.png",
            Mist: "weather img/mist.png",
            Drizzle: "weather img/drizzle.png",
            Snow: "weather img/snow.png",
            Thunderstorm: "weather img/thunderstorm.png",
            Default: "weather img/default.png"
        };
        return icons[weather] || icons.Default;
    }
});
