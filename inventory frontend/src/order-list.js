document.addEventListener('DOMContentLoaded', function() {
    function loadOrders() {
        fetch('http://localhost:8080/api/orders')
            .then(response => response.json())
            .then(orders => {
                const tbody = document.querySelector('#order-table tbody');
                tbody.innerHTML = '';
                orders.forEach(order => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${order.id}</td>
                        <td>${order.orderDate}</td>
                        <td>${order.customerId}</td>
                        <td>${order.productId}</td>
                        <td>${order.quantity}</td>
                        <td>${order.totalPrice}</td>
                        <td>
                            <button onclick="viewOrder(${order.id})">View</button>
                            <button onclick="deleteOrder(${order.id})">Delete</button>
                        </td>
                    `;
                    tbody.appendChild(tr);
                });
            });
    }

    function viewOrder(id) {
        localStorage.setItem('orderToView', JSON.stringify({ id }));
        window.location.href = 'view-order.html';
    }

    function deleteOrder(id) {
        fetch(`http://localhost:8080/api/orders/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Order deleted successfully');
                loadOrders();
            } else {
                alert('Failed to delete order');
            }
        });
    }

    document.getElementById('add-order').onclick = function() {
        window.location.href = 'add-order.html';
    };

    loadOrders();
});
