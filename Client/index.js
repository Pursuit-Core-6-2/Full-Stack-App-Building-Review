const baseUrl = 'http://localhost:3129/inventory'

document.addEventListener('DOMContentLoaded', ()=> {
    let listSelectTracker = 0;
    //SELECTION BUTTONS
    const selectVeggie = document.querySelector('#selectVeggie');
    const selectBread = document.querySelector('#selectBread');
    const selectAllItems = document.querySelector('#selectAllItems');

    // DIV
    const vegetableDiv = document.querySelector('#vegetableDiv');
    const editVeggieDiv = document.querySelector('#editVeggieDiv');

    const breadDiv = document.querySelector('#breadDiv');
    const editBreadDiv = document.querySelector('#editBreadDiv');

    const allItemsDiv = document.querySelector('#allItemsDiv');
    const feedbackDiv = document.querySelector('#feedbackDiv');
    // FEEDBACK TEXT
    const feedbackTextArea = feedbackDiv.querySelector('p');


    // FORMS
    const addOrEditVeggie = document.querySelector('#addOrEditVeggie');
    const getVeggies = document.querySelector('#getVeggies');
    const addOrEditBread = document.querySelector('#addOrEditBread');
    const getBread = document.querySelector('#getBread');
    const editVeggie = document.querySelector('#editVeggie');
    const editBread = document.querySelector('#editBread');


    // VEGGIES INPUTS
    const veggieName = document.querySelector('#veggieName');
    const veggiePrice = document.querySelector('#veggiePrice');
    const veggieUnits = document.querySelector('#veggieUnits');
    const veggieOrigin = document.querySelector('#veggieOrigin');
    const veggieUnit = document.querySelector('#veggieUnit');
    const veggieIdInput = document.querySelector('#veggieId')


    // BREAD INPUTS
    const breadName = document.querySelector('#breadName');
    const breadPrice = document.querySelector('#breadPrice');
    const breadUnits = document.querySelector('#breadUnits');
    const breadBakery = document.querySelector('#breadBakery');
    const BreadTypeInput = document.querySelector('#Bread_Type');
    const breadIdInput = document.querySelector('#breadId');

    // LIST 
    const itemsHolder = allItemsDiv.querySelector('ul');


    // EDIT VEGGIES INPUTS
    const editVeggieID = document.querySelector('#editVeggieID');
    const editVeggieName = document.querySelector('#editVeggieName');
    const editVeggiePrice = document.querySelector('#editVeggiePrice');
    const editVeggieUnits = document.querySelector('#editVeggieUnits');
    const editVeggieOrigin = document.querySelector('#editVeggieOrigin');
    const editVeggieUnit = document.querySelector('#editVeggieUnit');


    // EDIT BREAD INPUTS
    const editBreadID = document.querySelector('#editBreadID');
    const editBreadName = document.querySelector('#editBreadName');
    const editBreadPrice = document.querySelector('#editBreadPrice');
    const editBreadUnits = document.querySelector('#editBreadUnits');
    const editBreadBakery = document.querySelector('#editBreadBakery');
    const editBreadType = document.querySelector('#editBreadType');


    // HIDING ALL DIVs 
    vegetableDiv.style.display = 'none';
    breadDiv.style.display = 'none';
    // allItemsDiv.style.display = 'none';
    feedbackDiv.style.display = 'none';
    editVeggieDiv.style.display = 'none';
    editBreadDiv.style.display = 'none';


    // SHOW VEGETABLES DIV
    selectVeggie.addEventListener('click', () => {
        listSelectTracker = 'vegetable';
        vegetableDiv.style.display = 'block';
        breadDiv.style.display = 'none';
        // allItemsDiv.style.display = 'block';
        getAllVeggies(feedbackDiv, feedbackTextArea, itemsHolder);
    })

    // SHOW BREAD DIV
    selectBread.addEventListener('click', () => {
        listSelectTracker = 'bread';
        breadDiv.style.display = 'block';
        vegetableDiv.style.display = 'none';
        // allItemsDiv.style.display = 'block';
        getAllBread(feedbackDiv, feedbackTextArea, itemsHolder);
    })

    // SHOW ALL INVENTORY DIV
    selectAllItems.addEventListener('click', () => {
        listSelectTracker = 'all';
        // allItemsDiv.style.display = 'block';
        vegetableDiv.style.display = 'none';
        breadDiv.style.display = 'none';

        getAllItems(feedbackDiv, feedbackTextArea, itemsHolder);
    })

    // HIDE FEEDBACK DIV
    const closeDiv = feedbackDiv.querySelector('div');
    feedbackDiv.addEventListener('click', (event) => {
        if (event.target === closeDiv) {
            feedbackDiv.style.display = 'none'
        }
    })
    document.body.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            feedbackDiv.style.display = 'none';
            editVeggieDiv.style.display = 'none';
            editBreadDiv.style.display = 'none';
        }
    })

    // VEGETABLE FORM
    addOrEditVeggie.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = veggieName.value;
        const price = veggiePrice.value;
        const units = veggieUnits.value;
        const origin = veggieOrigin.value;
        const unit = veggieUnit.value;

        if (!name || !price || !units || !origin || !unit) {
            feedbackTextArea.innerText = 'Please fill out all fields\nALL FIELDS ARE REQUIRED'
            feedbackDiv.style.display = 'block';
        } else {
            const dataObject = {
                type: 'vegetable',
                name: name,
                price: price,
                units: units,
                origin: origin,
                unit: unit
            }
            try {
                let response = await axios.post(`${baseUrl}/vegetable`, dataObject)
                veggieRequestStatus(feedbackDiv, feedbackTextArea, response.data)
            } catch (err) {
                console.log(err)
            }
        }
    })

    // GET VEGGIES
    getVeggies.addEventListener('submit', async (event) => {
        event.preventDefault();

        const veggieId = veggieIdInput.value;
        if (veggieId) {
            try {
                veggieIdInput.value = '';
                let response = await axios.get(`${baseUrl}/vegetable/${veggieId}`);
                listVeggies(feedbackDiv, feedbackTextArea, itemsHolder, response.data)
            } catch (err) {
                console.log(err);
            }
        } else {
            getAllVeggies(feedbackDiv, feedbackTextArea, itemsHolder);
        }
    })

    // BREAD FORM
    addOrEditBread.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = breadName.value;
        const price = breadPrice.value;
        const units = breadUnits.value;
        const bakery = breadBakery.value;
        const breadType = BreadTypeInput.value;

        if (!name || !price || !units || !bakery || !breadType) {
            feedbackTextArea.innerText = 'Please fill out all fields\nALL FIELDS ARE REQUIRED'
            feedbackDiv.style.display = 'block';
        } else {
            const dataObject = {
                type: 'bread',
                name: name,
                price: price,
                units: units,
                bakery: bakery,
                bread_type: breadType
            }
            try {
                let response = await axios.post(`${baseUrl}/bread`, dataObject)
                breadRequestStatus(feedbackDiv, feedbackTextArea, response.data)
            } catch (err) {
                console.log(err)
            }
        }
    })

    // GET BREAD
    getBread.addEventListener('submit', async (event) => {
        event.preventDefault();

        const breadId = breadIdInput.value;
        if (breadId) {
            try {
                breadIdInput.value = '';
                let response = await axios.get(`${baseUrl}/bread/${breadId}`);
                listBread(feedbackDiv, feedbackTextArea, itemsHolder, response.data);
            } catch (err) {
                console.log(err);
            }
        } else {
            getAllBread(feedbackDiv, feedbackTextArea, itemsHolder);
        }
    })

    // SELECTING ITEM USING ID
    itemsHolder.addEventListener('click', async (event) => {
        if (event.target.parentNode === itemsHolder) {
            const item = JSON.parse(event.target.className);

            if (item.type === 'vegetable') {
                editVeggieDiv.style.display = 'block';
                editBreadDiv.style.display = 'none';

                editVeggieID.value = item.id;
                editVeggieName.value = item.name;
                editVeggiePrice.value = parseFloat(item.price).toFixed(2);
                editVeggieUnits.value = parseFloat(item.units).toFixed(2);
                editVeggieOrigin.value = item.origin;
                editVeggieUnit.value = item.unit;
            }
            if (item.type === 'bread') {
                editVeggieDiv.style.display = 'none';
                editBreadDiv.style.display = 'block';

                editBreadID.value = item.id;
                editBreadName.value = item.name;
                editBreadPrice.value = parseFloat(item.price).toFixed(2);
                editBreadUnits.value = parseFloat(item.units).toFixed(2);
                editBreadBakery.value = item.bakery;
                editBreadType.value = item.bread_type;
            }
        }
    })

    // DELETING ITEM USING ID
    itemsHolder.addEventListener('click', async (event) => {
        if (event.target.className === 'delete') {
            const item = JSON.parse((event.target.parentNode).className)
            const id = item.id;
            const type = item.type;
            try {
                const response = await axios.delete(`${baseUrl}/${type}/${id}`);
                if (type === 'vegetable') {
                    veggieRequestStatus(feedbackDiv, feedbackTextArea, response.data);
                }
                if (type === 'bread') {
                    breadRequestStatus(feedbackDiv, feedbackTextArea, response.data);
                }
                if (response.data.status === 'success') {
                    (event.target).style.visibility = 'hidden';
                    (event.target.parentNode).style.textDecoration = 'line-through';
                }
            } catch (err) {
                console.log(err)
            }
        }
    })


    //
    editVeggie.addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = editVeggieID.value;
        const dataObject = {
            type: 'vegetable',
            name: editVeggieName.value,
            price: editVeggiePrice.value,
            units: editVeggieUnits.value,
            origin: editVeggieOrigin.value,
            unit: editVeggieUnit.value
        }
        try {
            const response = await axios.patch(`${baseUrl}/vegetable/${id}`, dataObject);
            veggieRequestStatus(feedbackDiv, feedbackTextArea, response.data);
            if (listSelectTracker === 'vegetable') {
                getAllVeggies(feedbackDiv, feedbackTextArea, itemsHolder);
            }
            if (listSelectTracker === 'bread') {
                getAllBread(feedbackDiv, feedbackTextArea, itemsHolder);
            }
            if (listSelectTracker === 'all') {
                getAllItems(feedbackDiv, feedbackTextArea, itemsHolder);
            }
        } catch (err) {
            console.log(err)
        }
        editVeggieDiv.style.display = 'none';
    })


    //
    editBread.addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = editBreadID.value;
        const dataObject = {
            type: 'bread',
            name: editBreadName.value,
            price: editBreadPrice.value,
            units: editBreadUnits.value,
            bakery: editBreadBakery.value,
            bread_type: editBreadType.value
        }
        try {
            const response = await axios.patch(`${baseUrl}/bread/${id}`, dataObject);
            breadRequestStatus(feedbackDiv, feedbackTextArea, response.data);
            if (listSelectTracker === 'vegetable') {
                getAllVeggies(feedbackDiv, feedbackTextArea, itemsHolder);
            }
            if (listSelectTracker === 'bread') {
                getAllBread(feedbackDiv, feedbackTextArea, itemsHolder);
            }
            if (listSelectTracker === 'all') {
                getAllItems(feedbackDiv, feedbackTextArea, itemsHolder);
            }
        } catch (err) {
            console.log(err)
        }
        editBreadDiv.style.display = 'none';
    })


}) // END OF EVENT LISTENER FOR DOM CONTENT LOADED


//
const getAllVeggies = async (container, textArea, ulList) => {
    try {
        let response = await axios.get(`${baseUrl}/vegetable`);
        listVeggies(container, textArea, ulList, response.data)
    } catch (err) {
        console.log(err);
    }
};

//
const getAllBread = async (container, textArea, ulList) => {
    try {
        let response = await axios.get(`${baseUrl}/bread`);
        listBread(container, textArea, ulList, response.data);
    } catch (err) {
        console.log(err);
    }
};

//
const getAllItems = async (container, textArea, ulList) => {
    try {
        let response = await axios.get(`${baseUrl}/all`)
        listAllItems(container, textArea, ulList, response.data)
    } catch (err) {
        console.log(err)
    }
};

//
const veggieRequestStatus = (feedback, textArea, data) => {
    feedback.style.display = 'block'
    textArea.innerText = (data.status).toUpperCase();
    const paragraph = document.createElement('p');
    if (data.status === 'success') {
        paragraph.innerText = `ID: ${data.message.id}
        Timestamp: ${data.message.arrived_timestamp}
        Type: ${data.message.type}
        Name: ${data.message.name[0].toUpperCase() + (data.message.name).slice(1, data.message.name.length)}
        Price: ${data.message.price}
        Units: ${data.message.units} ${data.message.unit}
        Origin: ${data.message.origin[0].toUpperCase() + (data.message.origin).slice(1, data.message.origin.length)}`
    } else {
        paragraph.innerText = data.message;
    }
    textArea.appendChild(paragraph)
}

//
const breadRequestStatus = (feedback, textArea, data) => {
    feedback.style.display = 'block'
    textArea.innerText = (data.status).toUpperCase();
    const paragraph = document.createElement('p');
    if (data.status === 'success') {
        paragraph.innerText = `ID: ${data.message.id}
        Timestamp: ${data.message.arrived_timestamp}
        Type: ${data.message.type}
        Name: ${data.message.name[0].toUpperCase() + (data.message.name).slice(1, data.message.name.length)}
        Price: ${data.message.price}
        Units: ${data.message.units}
        Bread Type: ${data.message.bread_type[0].toUpperCase() + (data.message.bread_type).slice(1, data.message.bread_type.length)}
        Bakery: ${data.message.bakery[0].toUpperCase() + (data.message.bakery).slice(1, data.message.bakery.length)}`
    } else {
        paragraph.innerText = data.message;
    }
    textArea.appendChild(paragraph)
}


//
const listVeggies = (feedback, textArea, listHolder, data) => {
    listHolder.innerText = '';
    if (data.status === 'success') {
        for (let item of data.message) {
            let li = document.createElement('li');
            li.id = item.id;
            li.className = JSON.stringify(item);
            li.innerText = `ID: ${item.id}
            Timestamp: ${item.arrived_timestamp}
            Type: ${item.type}
            Name: ${item.name[0].toUpperCase() + (item.name).slice(1, item.name.length)}
            Price: ${item.price}
            Units: ${item.units} ${item.unit}
            Origin: ${item.origin[0].toUpperCase() + (item.origin).slice(1, item.origin.length)}`;
            listHolder.appendChild(li);

            let deleteDiv = document.createElement('div')
            deleteDiv.innerText = `Delete`;
            deleteDiv.className = 'delete';
            li.appendChild(deleteDiv);
        }
    } else {
        feedback.style.display = 'block'
        textArea.innerText = (data.status).toUpperCase() + '\n' + data.message;
    }
}

//
const listBread = (feedback, textArea, listHolder, data) => {
    listHolder.innerText = '';
    if (data.status === 'success') {
        for (let item of data.message) {
            let li = document.createElement('li');
            li.id = item.id;
            li.className = JSON.stringify(item);
            li.innerText = `ID: ${item.id}
            Timestamp: ${item.arrived_timestamp}
            Type: ${item.type}
            Name: ${item.name[0].toUpperCase() + (item.name).slice(1, item.name.length)}
            Price: ${item.price}
            Units: ${item.units}
            Bread Type: ${item.bread_type[0].toUpperCase() + (item.bread_type).slice(1, item.bread_type.length)}
            Bakery: ${item.bakery[0].toUpperCase() + (item.bakery).slice(1, item.bakery.length)}`;
            listHolder.appendChild(li);

            let deleteDiv = document.createElement('div')
            deleteDiv.innerText = `Delete`;
            deleteDiv.className = 'delete';
            li.appendChild(deleteDiv);
        }
    } else {
        feedback.style.display = 'block'
        textArea.innerText = (data.status).toUpperCase() + '\n' + data.message;
    }
}


const listAllItems = (feedback, textArea, listHolder, data) => {
    listHolder.innerText = '';
    if (data.status === 'success') {
        for (let item of data.message) {
            let li = document.createElement('li');
            li.id = item.id;
            li.className = JSON.stringify(item);
            if (item.type === 'vegetable') {
                li.innerText = `ID: ${item.id}
                Timestamp: ${item.arrived_timestamp}
                Type: ${item.type}
                Name: ${item.name[0].toUpperCase() + (item.name).slice(1, item.name.length)}
                Price: ${item.price}
                Units: ${item.units} ${item.unit}
                Origin: ${item.origin[0].toUpperCase() + (item.origin).slice(1, item.origin.length)}`;
            } else if (item.type === 'bread') {
                li.innerText = `ID: ${item.id}
                Timestamp: ${item.arrived_timestamp}
                Type: ${item.type}
                Name: ${item.name[0].toUpperCase() + (item.name).slice(1, item.name.length)}
                Price: ${item.price}
                Units: ${item.units}
                Bread Type: ${item.bread_type[0].toUpperCase() + (item.bread_type).slice(1, item.bread_type.length)}
                Bakery: ${item.bakery[0].toUpperCase() + (item.bakery).slice(1, item.bakery.length)}`;
            }
            listHolder.appendChild(li);

            let deleteDiv = document.createElement('div')
            deleteDiv.innerText = `Delete`;
            deleteDiv.className = 'delete';
            li.appendChild(deleteDiv);
        }
    } else {
        feedback.style.display = 'block'
        textArea.innerText = (data.status).toUpperCase() + '\n' + data.message;
    }
}
