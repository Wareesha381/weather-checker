
document.addEventListener('DOMContentLoaded',()=>
{
    const inputCity=document.getElementById('city_name');
    const checkWeatherBtn=document.getElementById('check_weather');
    const cityName=document.getElementById('city');
    const cityCurrentTemperature=document.getElementById('temperature');
    const cityCurrentWeather=document.getElementById('weather');
    const displayingWeather=document.getElementById('show-weather');
    const errorMessage=document.getElementById('error-message');
    const apiKey=`befec2fed0efd014d36469a0e3cd454f
`;


    checkWeatherBtn.addEventListener('click',async ()=>{
        const enteredCity=inputCity.value.trim();
        
        if(!enteredCity) {
            return;
        }

        //server might throw error
        try
        {
            //server might be in another continent
           
         const weatherData= await  fetchWeatherData(enteredCity);
         displayWeatherData(weatherData);
        }
        catch(error)
        {
            showError();
        }
        inputCity.value="";
    })

    async function fetchWeatherData(enteredCity){
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&units=metric&appid=${apiKey}`;


       const responce= await fetch(url);
      if(!responce.ok)
        {
            throw new Error(`City Not Found`);
        }
       const data= await responce.json();
       return data;
    }
     
    function displayWeatherData(data){

       const {name,main,weather}=data;

       cityName.textContent=name;
       cityCurrentTemperature. textContent=`Temperature: ${main.temp} °C`;
       cityCurrentWeather.textContent=`Weather: ${weather[0].description}`;
       displayingWeather.classList.remove('hidden');
       errorMessage.textContent="";
       errorMessage.classList.add('hidden');
      
        
    }

    function showError(){
        displayingWeather.classList.remove('hidden');
        errorMessage.textContent=`City not found please Try Again`;
        errorMessage.classList.add('hidden');
    }
})