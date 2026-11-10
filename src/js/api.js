const gold = document.getElementById('gold-price')
const silver = document.getElementById('silver-price')
const updated = document.getElementById('updated')


export async function getPrices() {
    const response = await fetch('https://xaus.com/api/v1/spot');
    const data = await response.json();
    console.log(data);
    let silverG = data.silver_usd_oz / 31.1035;
    updated.textContent = data.data_state.as_of.slice(11, 19);
    gold.textContent = data.per_gram_usd.toFixed(4) + " USD";
    silver.textContent = silverG.toFixed(4) + " USD";
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

