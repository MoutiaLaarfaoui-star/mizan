const gold = document.getElementById('gold-price')
const silver = document.getElementById('silver-price')
const updated = document.getElementById('updated')
const goldchg = document.getElementById('gold-chg')
const silverchg = document.getElementById('silver-chg')



export async function getPrices() {
    const response = await fetch('https://xaus.com/api/v1/spot');
    const data = await response.json();
    console.log(data);
    
    const res = await fetch('https://xaus.com/api/v1/chart?symbol=xau&range=5d&interval=1d&utm_source=chatgpt.com ')
    const d = await res.json();
    console.log(d);

    let dernier = d.points[3].o / 31.1035;
    
    const selv = await fetch('https://xaus.com/api/v1/chart?symbol=silver&range=5d&interval=1d&utm_source=chatgpt.com')
    const s = await selv.json();
    console.log(s);

    let selverp = s.points[3].o / 31.1035
    let silverG = data.silver_usd_oz / 31.1035;

    console.log(dernier)
    let fark = ((data.per_gram_usd.toFixed(4) - dernier) / dernier) * 100
    let farks = ((silverG.toFixed(4) - selverp) / selverp) * 100
    
    updated.textContent = data.data_state.as_of.slice(11, 19);
    gold.textContent = data.per_gram_usd.toFixed(4) + " USD";
    silver.textContent = silverG.toFixed(4) + " USD";

    if (fark.toFixed(4) > 0) {
         goldchg.classList.add('text-green-700')
         goldchg.textContent = "▲" + "+" + fark.toFixed(4) + "%" ;
    } else {
        goldchg.classList.add('text-red-700')
        goldchg.textContent = "▼" + fark.toFixed(4) + "%" ;
    }

     if (farks.toFixed(4) > 0) {
         silverchg.classList.add('text-green-700')
         silverchg.textContent = "▲" + "+" + farks.toFixed(4) + "%" ;
    } else {
        silverchg.classList.add('text-red-700')
        silverchg.textContent = "▼" + farks.toFixed(4) + "%" ;
    }
    
    
    return data;
}

getPrices();

// export async function getPrices() {
//     try {
//         const response = await fetch(
//             'https://xaus.com/api/v1/spot?currency=USD&unit=oz&compact=1'
//         );

//         if (!response.ok) {
//             throw new Error(`HTTP Error: ${response.status}`);
//         }

//         const data = await response.json();

//         console.log("Gold Price:", data.xau.price, "USD");
//         console.log("Updated:", data.updated_at);

//         return data;

//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

// getPrices();

