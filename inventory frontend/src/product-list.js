document.addEventListener('DOMContentLoaded', function() {
    function loadProducts() {
        fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(products => {
                const tbody = document.querySelector('#product-table tbody');
                tbody.innerHTML = '';
                products.forEach(product => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${product.price}</td>
                        <td>${product.quantity}</td>
                        <td>
                            <button onclick="editProduct(${product.id})">Edit</button>
                            <button onclick="deleteProduct(${product.id})">Delete</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            });
    }

    function editProduct(id) {
        localStorage.setItem('productToEdit', JSON.stringify({ id }));
        window.location.href = 'edit-product.html';
    }

    function deleteProduct(id) {
        fetch(`http://localhost:8080/api/products/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Product deleted successfully');
                loadProducts();
            } else {
                alert('Failed to delete product');
            }
        });
    }

    document.getElementById('add-product').onclick = function() {
        window.location.href = 'add-product.html';
    };

    loadProducts();
});
