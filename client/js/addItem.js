document.addEventListener('DOMContentLoaded', () => {
  setupForm();
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
  } catch (err) {
    console.log(err)
  }
}

