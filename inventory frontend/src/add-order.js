document.getElementById('add-order-form').onsubmit = function(event) {
    event.preventDefault();
    
    const order = {
        orderDate: document.getElementById('orderDate').value,
        customerId: parseInt(document.getElementById('customerId').value),
        productId: parseInt(document.getElementById('productId').value),
        quantity: parseInt(document.getElementById('quantity').value),
        totalPrice: parseFloat(document.getElementById('totalPrice').value)
    };

    fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then(data => {
        alert('Order placed successfully');
        window.location.href = 'order-list.html'; // Redirect to order list
    })
    .catch(error => console.error('Error:', error));
};
