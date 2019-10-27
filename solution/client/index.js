document.addEventListener('DOMContentLoaded', () => {
  setupForm();
  getVegInventory();
})


// Make net request with axios. 
// To add item to inventory 

// When? When you submit the form
// With what data? Data from the input boxes
// To what endpoint? [POST] /inventory/vegetables


// Add event listener to form to listen for `submit` event
const setupForm = () => {
  let form = document.querySelector('form')
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    addVegetable();
  })
}

// Grab the data from the input fields and fill this object with it
const grabData = () => {
  // name, units, price, unit, origin

  let name = document.querySelector('#veg-name').value
  let price = document.querySelector('input[name="price"]').value
  let unit = document.querySelector('input[name="unit"]').value
  let units = document.querySelector('input[name="units"]').value
  let origin = document.querySelector('input[name="origin"]').value

  let data = {
    name: name,
    price: price, // Long way
    unit, // Shorthand for the previous ones
    units,
    origin
  }

  return data
}

const addVegetable = async () => {
  let url = 'http://localhost:3000/inventory/vegetables'

  let reqBody = grabData();

  try {
    let response = await axios.post(url, reqBody)
    let newVeggie = response.data
    displayVegInventory([newVeggie])
  } catch (err) {
    console.log(err)
  }
}

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

displayVegInventory = (veggies) => {
  const ul = document.querySelector('ul')

  veggies.forEach(veg => {
    let li = document.createElement('li')
    li.innerText = `${veg.name} - ${veg.unit} - ${veg.units} - $${veg.price}`
    ul.appendChild(li);
  })
}
