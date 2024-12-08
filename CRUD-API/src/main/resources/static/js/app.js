const apiUrl = "/api/products";

window.onload = function() {
    fetchProducts();

    document.getElementById("product-form").onsubmit = function(e) {
        e.preventDefault();
        const product = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            price: parseFloat(document.getElementById("price").value)
        };

        createProduct(product);
    };
};

async function fetchProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();
    const tbody = document.querySelector("#products-table tbody");
    tbody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function createProduct(product) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (response.ok) {
        fetchProducts(); // Refresh the product list
    } else {
        alert("Error creating product");
    }
}

async function deleteProduct(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        fetchProducts(); // Refresh the product list
    } else {
        alert("Error deleting product");
    }
}
