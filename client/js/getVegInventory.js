document.addEventListener('DOMContentLoaded', () => {
  getVegInventory();
})

/*
 Network request to the server get all the vegetables inventory
 What endpoint?
 What to do with the data?
  - Create a li item for every item in the inventory
  - Append 

*/


const getVegInventory = async () => {
  let url = 'http://localhost:3000/inventory/vegetables'

  try {
    let response = await axios.get(url)
    displayVegInventory(response.data)
  } catch (err) {
    console.log(err)
  }
}

const displayVegInventory = (veggies) => {
  const ul = document.querySelector('ul')

  veggies.forEach(veg => {
    let li = document.createElement('li')
    li.innerText = `${veg.name} - ${veg.unit} - ${veg.units} - $${veg.price}`
    ul.appendChild(li);
  })
}
