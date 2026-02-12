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

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
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
    const data = await req.json();
    renderData(data[0]);
    return `This is bordering country ${data[0].flag}`;
  } catch (err) {
    console.error(`Eror007${err}`); //error argument is default property given by try catch. err.message ,default property used for just displaying message.
  } //error handling using try and catch
};
getCountry("pakistan");
// returning values from async function.

// getCountry("bangladesh")
//   .then((d) => console.log(d))
//   .catch((err) => console.error(`your error ${err}`))
//   .finally(() => console.log("run"))
//writing async function to return same value.

(async function () {
  try {
    const prmc = await getCountry("bangladesh");
    console.log(prmc);
  } catch (err) {
    console.error(`your error ${err}`);
  }
  console.log("run");
})();

const get3countries = async function (c1, c2, c3) {
  try {
    //running all saperately
    const [data1] = await getJSON(
      `https://countries-api-836d.onrender.com/countries/name/${c1}`,
    );
    const [data2] = await getJSON(
      `https://countries-api-836d.onrender.com/countries/name/${c2}`,
    );
    const [data3] = await getJSON(
      `https://countries-api-836d.onrender.com/countries/name/${c3}`,
    );
    console.log([data1.capital, data2.capital, data3.capital]);

    // running all in parallel
    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
    ]);
    console.log(data.map((d) => d[0].capital));
    //can also run all in parallel using .then
  } catch (err) {
    console.error(`137 error${err}`);
  }
};

get3countries("pakistan", "iran", "china");
