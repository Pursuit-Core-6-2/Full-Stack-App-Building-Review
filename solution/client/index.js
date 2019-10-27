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

const addVegetable = async () => {
  let url = 'http://localhost:3000/inventory/vegetables'

  // name, units, price, unit, origin

  // Grab the data from the input fields and fill this object with it
  let reqBody = {
    name: "Broccoli",
    unit,
    units,
    price,
    origin
  }

  try {
    let response = await axios.post(url, reqBody)
    console.log(response.data)
  } catch (err) {
    console.log(err)
  }
}
