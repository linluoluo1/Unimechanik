const tableBody = document.querySelector("#table tbody");
let data = [];
let sortColCurrent = null;
let isAscending = true;
const filterCols = document.querySelectorAll("th[data-column]");
const searchInput = document.querySelector("#searchInput")
function getData() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((jsonData) => {
            data = jsonData;
            renderData();
        })
        .catch((error) =>
            console.error("Ошибка при получении данных:", error)
        );
}

function renderData() {
    tableBody.innerHTML = "";

    if (sortColCurrent) {
        data.sort((a, b) => {
            const aVal = sortColCurrent === 'id' ? Number(a[sortColCurrent]) : a[sortColCurrent];
            const bVal = sortColCurrent === 'id' ? Number(b[sortColCurrent]) : b[sortColCurrent];

            if (isAscending) {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });
    }

    data.forEach((post) => {
        const tr = tableBody.insertRow();
        const idCol = tr.insertCell(0);
        const titleCol = tr.insertCell(1);
        const bodyCol = tr.insertCell(2);

        idCol.innerHTML = post.id;
        titleCol.innerHTML = post.title;
        bodyCol.innerHTML = post.body;
    });
}

function handleColClick(event) {
    const column = event.target.getAttribute("data-column");

    if (column === sortColCurrent) {
        isAscending = !isAscending;
    } else {
        sortColCurrent = column;
        isAscending = true;
    }

    renderData();
}

function search() {
    const searchValue = searchInput.value.toLowerCase();

    if (searchValue.length >= 3) {
        const filteredResults = data.filter((post) => {
            return post.id.toString().includes(searchValue) ||
                post.title.toLowerCase().includes(searchValue) ||
                post.body.toLowerCase().includes(searchValue)
        });

        tableBody.innerHTML = "";

        filteredResults.forEach((post) => {
            const tr = tableBody.insertRow();
            const idCol = tr.insertCell(0);
            const titleCol = tr.insertCell(1);
            const bodyCol = tr.insertCell(2);

            idCol.innerHTML = post.id;
            titleCol.innerHTML = post.title;
            bodyCol.innerHTML = post.body;
        })
    } else {

    }

}

filterCols.forEach((header) => {
    header.addEventListener('click', handleColClick);
});

searchInput.addEventListener('input', search)

getData();