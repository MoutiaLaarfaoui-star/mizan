import {pourcentage} from './estimator.js';
import {getSpotApi, getChartApi} from './api.js';


const gold = document.getElementById('gold-price')
const silver = document.getElementById('silver-price')
const updated = document.getElementById('updated')
const goldchg = document.getElementById('gold-chg')
const silverchg = document.getElementById('silver-chg')
const currency = document.getElementById('currency')



const getApiMAD = await getSpotApi("MAD");
const getApiUSD = await getSpotApi("USD");
const getApiEUR = await getSpotApi("EUR");


const silverPrice = getApiUSD.silver_usd_oz / 31.1035;

const dernierPriceG = await getChartApi("xau");
const dernierPriceS = await getChartApi("silver");

let dernier = pourcentage(getApiUSD.xau.price.toFixed(4), (dernierPriceG.points[3].c.toFixed(4)/ 31.1035));
let dernierS = pourcentage(silverPrice.toFixed(4), (dernierPriceS.points[3].c.toFixed(4) / 31.1035));

console.log(dernierPriceG.points[3].c.toFixed(4) / 31.1035)

gold.textContent = getApiUSD.xau.price + " USD";
silver.textContent = silverPrice.toFixed(4) +" USD";



let baseGld = getApiUSD.xau.price.toFixed(4) - (dernierPriceG.points[3].c.toFixed(4) / 31.1035);
let baseSlv = silverPrice.toFixed(4) - (dernierPriceS.points[3].c.toFixed(4) / 31.1035);

let gld = baseGld;
let slv = baseSlv;


function updateGoldSilverUI() {
    updated.textContent = getApiMAD.updated_at.slice(11, 19);

    if (dernier.toFixed(4) > 0) {
        goldchg.classList.remove('text-red-700');
        goldchg.classList.add('text-green-700');
        goldchg.textContent = `(+${gld.toFixed(4)}) ▲ +${dernier.toFixed(4)}%`;
    } else {
        goldchg.classList.remove('text-green-700');
        goldchg.classList.add('text-red-700');
        goldchg.textContent = `(${gld.toFixed(4)}) ▼ ${dernier.toFixed(4)}%`;
    }

    if (dernierS.toFixed(4) > 0) {
        silverchg.classList.remove('text-red-700');
        silverchg.classList.add('text-green-700');
        silverchg.textContent = `(+${slv.toFixed(4)}) ▲ +${dernierS.toFixed(4)}%`;
    } else {
        silverchg.classList.remove('text-green-700');
        silverchg.classList.add('text-red-700');
        silverchg.textContent = `(${slv.toFixed(4)}) ▼ ${dernierS.toFixed(4)}%`;
    }
}


updateGoldSilverUI();


currency.addEventListener('change', () => {
    if (currency.value === "MAD") {
        gold.textContent = getApiMAD.xau.price + " MAD";
        silver.textContent = (silverPrice.toFixed(4) * getApiMAD.fx_rate).toFixed(4) + " MAD";
        
        slv = baseSlv * getApiMAD.fx_rate;
        gld = baseGld * getApiMAD.fx_rate;

    } else if (currency.value === "USD") {
        gold.textContent = getApiUSD.xau.price + " USD";
        silver.textContent = silverPrice.toFixed(4) + " USD";
        
        slv = baseSlv; 
        gld = baseGld;

    } else { // EUR
        gold.textContent = getApiEUR.xau.price + " EUR";
        silver.textContent = (silverPrice.toFixed(4) * getApiEUR.fx_rate).toFixed(4) + " EUR";
        
        slv = baseSlv * getApiEUR.fx_rate;
        gld = baseGld * getApiEUR.fx_rate;
    }


    updateGoldSilverUI();
});