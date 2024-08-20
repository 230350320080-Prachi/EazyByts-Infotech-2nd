document.getElementById('add-product-form').onsubmit = function(event) {
    event.preventDefault();
    
    const product = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        price: parseFloat(document.getElementById('price').value),
        quantity: parseInt(document.getElementById('quantity').value)
    };

    fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        alert('Product added successfully');
        window.location.href = 'product-list.html'; // Redirect to product list
    })
    .catch(error => console.error('Error:', error));
};
