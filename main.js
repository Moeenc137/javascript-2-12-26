const countriesContainter = document.querySelector(".countries");

const renderData = function (data) {
  const html = `
     <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>  
  `;
  countriesContainter.insertAdjacentHTML("beforeend", html);
};

//fetching api using async/await the main difference between promises and this is that there are no
//callbacks here, we use fetch just like in promises and same here we build promise but to handle the
// promise we enclose all that using await function , await function just wait till the data is being
// fetched and whn it is fetched it just return the data into the variable.

const getCountry = async function (country) {
  try {
    const req = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${country}`,
    );
    const request = await req.json();
    console.log(request);
    renderData(request[0]);
  } catch (err) {
    console.error(`Eror007${err}`); //error argument is default property given by try catch. err.message ,default property used for just displaying message.
  } //error handling using try and catch
};
getCountry("pakistan");
