// API URLs
const baseUrl = '/api/products';

// Get DOM elements
const form = document.getElementById('product-form');
const productsTable = document.getElementById('products-table').getElementsByTagName('tbody')[0];
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const priceInput = document.getElementById('price');

// Fetch and render all products
async function fetchProducts() {
    const response = await fetch(baseUrl);
    const products = await response.json();

    // Clear the table body before rendering new data
    productsTable.innerHTML = '';

    products.forEach(product => {
        const row = productsTable.insertRow();

        row.insertCell(0).innerText = product.id;
        row.insertCell(1).innerText = product.name;
        row.insertCell(2).innerText = product.description;
        row.insertCell(3).innerText = `$${product.price.toFixed(2)}`;

        // Insert delete button
        const actionsCell = row.insertCell(4);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteProduct(product.id);
        actionsCell.appendChild(deleteButton);
    });
}

// Create a new product via API
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const product = {
        name: nameInput.value,
        description: descriptionInput.value,
        price: parseFloat(priceInput.value)
    };

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        fetchProducts();  // Re-fetch and render products
        form.reset();  // Clear the form
    }
});

// Delete a product via API
async function deleteProduct(productId) {
    const response = await fetch(`${baseUrl}/${productId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchProducts();  // Re-fetch and render products
    }
}

// Initial fetch of products
fetchProducts();
