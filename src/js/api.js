// const gold = document.getElementById('gold-price')
// const silver = document.getElementById('silver-price')
// const updated = document.getElementById('updated')
// const goldchg = document.getElementById('gold-chg')
// const silverchg = document.getElementById('silver-chg')



// export async function getPrices() {
//     const response = await fetch('https://xaus.com/api/v1/spot');
//     const data = await response.json();
//     console.log(data);
    
//     const res = await fetch('https://xaus.com/api/v1/chart?symbol=xau&range=5d&interval=1d')
//     const d = await res.json();
//     console.log(d);

//     let dernier = d.points[3].o / 31.1035;
    
//     const selv = await fetch('https://xaus.com/api/v1/chart?symbol=silver&range=5d&interval=1d')
//     const s = await selv.json();
//     console.log(s);

//     let selverp = s.points[3].o / 31.1035
//     let silverG = data.silver_usd_oz / 31.1035;

//     console.log(dernier)
//     let fark = ((data.per_gram_usd.toFixed(4) - dernier) / dernier) * 100
//     let farks = ((silverG.toFixed(4) - selverp) / selverp) * 100
    
//     updated.textContent = data.data_state.as_of.slice(11, 19);
//     gold.textContent = data.per_gram_usd.toFixed(4) + " USD";
//     silver.textContent = silverG.toFixed(4) + " USD";

//     
    
    
//     return data;
// }

const TROY_OUNCE = 31.1035;

async function getSpotApi(currency) {

    const allowedCurrency = ["MAD", "USD", "EUR"];

    if (!allowedCurrency.includes(currency)) {
        throw new Error("Unsupported Currency!");
    }

    const api = await fetch(`https://xaus.com/api/v1/spot?currency=${currency}&unit=gram`);

    if (!api.ok) {
        throw new Error(`HTTP Failed : ${api.status}`);
    }

    const result = await api.json();

    return result;
}

async function getChartApi(symbol) {

    const allowedSymbol = ["xau", "silver"];

    if (!allowedSymbol.includes(symbol)) {
        throw new Error("Unsupported Symbol!");
    }

    const api = await fetch(`https://xaus.com/api/v1/chart?symbol=${symbol}&range=5d&interval=1d`);

    if (!api.ok) {
        throw new Error(`HTTP Failed : ${api.status}`);
    }

    const result = await api.json();

    return result;
}

export { getSpotApi, getChartApi }