
const background = document.getElementById('background');

document.addEventListener('mousemove', (e) => {
  const xPos = e.clientX;
  const yPos = e.clientY;

  const red = xPos / window.innerWidth * 255;
  const green = yPos / window.innerHeight * 255;
  const blue = 150; // قيمة ثابتة للون الأزرق

  background.style.background = `radial-gradient(circle at ${xPos}px ${yPos}px, rgb(${red}, ${green}, ${blue}), #ffffff)`;
});

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
//console.log(title,price,taxes,ads,discount,total,count,category,submit);

let datapro = localStorage.product != null ? JSON.parse(localStorage.product) : [];

let mode = 'create';
let tempIndex;

///get total
function getTotal() {
    //  console.log('done')
    if (price.value != '') {
        let res = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = res;
        total.style.background = 'green';
    } else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
}

///create
submit.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }

    if (mode === 'create') {
        if (newpro.count > 1) {
            for (let i = 0; i < newpro.count; i++) {
                datapro.push(newpro);
            }
        } else {
            datapro.push(newpro);
        }
    } else {
        datapro[tempIndex] = newpro;
        mode = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }

    localStorage.setItem('product', JSON.stringify(datapro));
    clearData();
    showData();
}

//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read
function showData() {
    let table = '';
    // Log the data structure of datapro
    console.log(datapro);
    for (let x = 0; x < datapro.length; x++) {
        table +=
            `
        <tr>
            <td>${x+1}</td>
            <td>${datapro[x].title}</td>
            <td>${datapro[x].price}</td>
            <td>${datapro[x].taxes}</td>
            <td>${datapro[x].ads}</td>
            <td>${datapro[x].discount}</td>
            <td>${datapro[x].total}</td>
            <td>${datapro[x].category}</td>
            <td><button onclick="updateData(${x})" id="update">Update</button></td>
            <td><button onclick="deleteOne(${x})" id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btndelete = document.getElementById('deleteall');

    if (datapro.length > 0) {
        btndelete.innerHTML = `
            <button onclick="deleteAll()">Delete All (${datapro.length})</button>
        `
    } else {
        btndelete.innerHTML = "";
    }
}

function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showData();
}

showData();

//delete
function deleteOne(x) {
    datapro.splice(x, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}

function updateData(index) {
    title.value = datapro[index].title;
    price.value = datapro[index].price;
    taxes.value = datapro[index].taxes;
    ads.value = datapro[index].ads;
    discount.value = datapro[index].discount;
    getTotal();
    count.style.display = 'none';
    category.value = datapro[index].category;
    submit.innerHTML = 'Update';
    mode = 'update';
    tempIndex = index;
}

//count

//update
//search
let searchMode = 'title';

document.getElementById('searchTitele').onclick = function () {
    searchMode = 'title';
    document.getElementById('search').placeholder = 'Search By Title';
    document.getElementById('search').focus();
    document.getElementById('search').value = '';
    showData();
}

document.getElementById('searchCategory').onclick = function () {
    searchMode = 'category';
    document.getElementById('search').placeholder = 'Search By Category';
    document.getElementById('search').focus();
    document.getElementById('search').value = '';
    showData();
}

document.getElementById('search').onkeyup = function () {
    searchData(this.value);
}

function searchData(value) {
    let table = '';
    for (let x = 0; x < datapro.length; x++) {
        if (datapro[x][searchMode].toLowerCase().includes(value.toLowerCase())) {
            table +=
                `
            <tr>
                <td>${x}</td>
                <td>${datapro[x].title}</td>
                <td>${datapro[x].price}</td>
                <td>${datapro[x].taxes}</td>
                <td>${datapro[x].ads}</td>
                <td>${datapro[x].discount}</td>
                <td>${datapro[x].total}</td>
                <td>${datapro[x].category}</td>
                <td><button onclick="updateData(${x})" id="update">Update</button></td>
                <td><button onclick="deleteOne(${x})" id="delete">Delete</button></td>
            </tr>
            `
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

//clean data

// Create follower element
const follower = document.createElement('div');
follower.classList.add('follower');
document.body.appendChild(follower);

document.addEventListener('mousemove', (e) => {
    follower.style.transition = 'transform 0.1s ease';
    follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
