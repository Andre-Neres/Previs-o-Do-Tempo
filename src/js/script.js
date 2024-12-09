document.querySelector('#pesquisar').addEventListener('submit', async (event) => { 
    event.preventDefault(); 
    
    const NomeCidade = document.querySelector('#nome_cidade').value;
    
    if(NomeCidade === "" ){
        return mostraralerta('Digite o nome da cidade!')  } 


    const appkey = `57e1245200c46ab3c7f50dd01df32bc6`
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(NomeCidade)}&appid=${appkey}&units=metric&lang=pt_br`
        
    const resultados = await fetch(apiurl);
    const json = await resultados.json();

    if(json.cod === 200) {
       mostrarinfo({
        cidade: json.name,
        pais: json.sys.country,
        temperatura: json.main.temp,
        temperaturamaxima: json.main.temp_max,
        temperaturaminima: json.main.temp_min,
        descricao: json.weather[0].description,
        iconetemp: json.weather[0].icon,
        umidade: json.main.humidity,
        velvento: json.wind.speed
        
    }) 
    }
});
function mostrarinfo(json){
    document.querySelector('#titulo').innerHTML = `${json.cidade}, ${json.pais}`;
    document.querySelector('#temperatura').innerHTML = `${json.temperatura.toFixed(1).replace('.',',')} <sup>Cº</sup>`;
    document.querySelector('#descricao').innerHTML = `${json.descricao}`;
    document.querySelector('#temp_max').innerHTML = `${json.temperaturamaxima.toFixed(1).replace('.',',')} <sup>Cº</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.temperaturaminima.toFixed(1).replace('.',',')} <sup>Cº</sup>`;
    document.querySelector('#umidade').innerHTML = `${json.umidade}%`;
    document.querySelector('#vento').innerHTML = `${(json.velvento*3.6).toFixed(2)} Km/H`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.iconetemp}@2x.png`)
}




function mostraralerta(msg){
    document.querySelector('#alerta').innerHTML = msg; 
}







