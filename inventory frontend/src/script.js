// Add Product Form Submission
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    // Check if user is logged in
    if (window.location.pathname === '/product-list.html' && !localStorage.getItem('loggedIn')) {
        window.location.href = 'login.html'; // Redirect to login page
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple validation example
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'product-list.html'; // Redirect to product list
            } else {
                loginError.textContent = 'Invalid credentials';
            }
        });
    }
});

    


    // Show Products
    document.getElementById('showProducts').addEventListener('click', () => {
        document.getElementById('productSection').style.display = 'block';
        document.getElementById('customerSection').style.display = 'none';
        document.getElementById('categorySection').style.display = 'none';
        document.getElementById('orderSection').style.display = 'none';

        fetch('/api/products')
            .then(response => response.json())
            .then(products => {
                const list = document.getElementById('productList');
                list.innerHTML = products.map(product => `
                    <div>
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                        <button onclick="editProduct(${product.id})">Edit</button>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                `).join('');
            });
    });

    // Show Customer-+s
    document.getElementById('showCustomers').addEventListener('click', () => {
        document.getElementById('productSection').style.display = 'none';
        document.getElementById('customerSection').style.display = 'block';
        document.getElementById('categorySection').style.display = 'none';
        document.getElementById('orderSection').style.display = 'none';

        fetch('/api/customers')
            .then(response => response.json())
            .then(customers => {
                const list = document.getElementById('customerList');
                list.innerHTML = customers.map(customer => `
                    <div>
                        <h3>${customer.name}</h3>
                        <p>Email: ${customer.email}</p>
                        <button onclick="editCustomer(${customer.id})">Edit</button>
                        <button onclick="deleteCustomer(${customer.id})">Delete</button>
                    </div>
                `).join('');
            });
    });

    // Show Categories
    document.getElementById('showCategories').addEventListener('click', () => {
        document.getElementById('productSection').style.display = 'none';
        document.getElementById('customerSection').style.display = 'none';
        document.getElementById('categorySection').style.display = 'block';
        document.getElementById('orderSection').style.display = 'none';

        fetch('/api/categories')
            .then(response => response.json())
            .then(categories => {
                const list = document.getElementById('categoryList');
                list.innerHTML = categories.map(category => `
                    <div>
                        <h3>${category.name}</h3>
                        <button onclick="editCategory(${category.id})">Edit</button>
                        <button onclick="deleteCategory(${category.id})">Delete</button>
                    </div>
                `).join('');
            });
    });

    // Show Orders
    document.getElementById('showOrders').addEventListener('click', () => {
        document.getElementById('productSection').style.display = 'none';
        document.getElementById('customerSection').style.display = 'none';
        document.getElementById('categorySection').style.display = 'none';
        document.getElementById('orderSection').style.display = 'block';

        fetch('/api/orders')
            .then(response => response.json())
            .then(orders => {
                const list = document.getElementById('orderList');
                list.innerHTML = orders.map(order => `
                    <div>
                        <h3>Order ID: ${order.id}</h3>
                        <p>Product ID: ${order.productId}</p>
                        <p>Quantity: ${order.quantity}</p>
                        <p>Date: ${order.date}</p>
                        <button onclick="editOrder(${order.id})">Edit</button>
                        <button onclick="deleteOrder(${order.id})">Delete</button>
                    </div>
                `).join('');
            });
    });

    // Add Product
    document.getElementById('addProduct').addEventListener('click', () => {
        const name = prompt('Enter product name:');
        const price = prompt('Enter product price:');
        
        fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Product added successfully');
                document.getElementById('showProducts').click(); // Refresh product list
            } else {
                alert('Error adding product');
            }
        });
    });

    // Add Customer
    document.getElementById('addCustomer').addEventListener('click', () => {
        const name = prompt('Enter customer name:');
        const email = prompt('Enter customer email:');
        
        fetch('/api/customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Customer added successfully');
                document.getElementById('showCustomers').click(); // Refresh customer list
            } else {
                alert('Error adding customer');
            }
        });
    });

    // Add Category
    document.getElementById('addCategory').addEventListener('click', () => {
        const name = prompt('Enter category name:');
        
        fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Category added successfully');
                document.getElementById('showCategories').click(); // Refresh category list
            } else {
                alert('Error adding category');
            }
        });
    });

    // Add Order
    document.getElementById('addOrder').addEventListener('click', () => {
        const productId = prompt('Enter product ID:');
        const quantity = prompt('Enter quantity:');
        
        fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Order placed successfully');
                document.getElementById('showOrders').click(); // Refresh order list
            } else {
                alert('Error placing order');
            }
        });
    });

    // Edit Product
    window.editProduct = (id) => {
        const name = prompt('Enter new product name:');
        const price = prompt('Enter new product price:');
        
        fetch(`/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Product updated successfully');
                document.getElementById('showProducts').click(); // Refresh product list
            } else {
                alert('Error updating product');
            }
        });
    };

    // Edit Customer
    window.editCustomer = (id) => {
        const name = prompt('Enter new customer name:');
        const email = prompt('Enter new customer email:');
        
        fetch(`/api/customers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Customer updated successfully');
                document.getElementById('showCustomers').click(); // Refresh customer list
            } else {
                alert('Error updating customer');
            }
        });
    };

    // Edit Category
    window.editCategory = (id) => {
        const name = prompt('Enter new category name:');
        
        fetch(`/api/categories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Category updated successfully');
                document.getElementById('showCategories').click(); // Refresh category list
            } else {
                alert('Error updating category');
            }
        });
    };

    // Edit Order
    window.editOrder = (id) => {
        const quantity = prompt('Enter new quantity:');
        
        fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Order updated successfully');
                document.getElementById('showOrders').click(); // Refresh order list
            } else {
                alert('Error updating order');
            }
        });
    };

    // Delete Product
    window.deleteProduct = (id) => {
        fetch(`/api/products/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Product deleted successfully');
                document.getElementById('showProducts').click(); // Refresh product list
            } else {
                alert('Error deleting product');
            }
        });
    };

    // Delete Customer
    window.deleteCustomer = (id) => {
        fetch(`/api/customers/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Customer deleted successfully');
                document.getElementById('showCustomers').click(); // Refresh customer list
            } else {
                alert('Error deleting customer');
            }
        });
    };

    // Delete Category
    window.deleteCategory = (id) => {
        fetch(`/api/categories/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Category deleted successfully');
                document.getElementById('showCategories').click(); // Refresh category list
            } else {
                alert('Error deleting category');
            }
        });
    };

    // Delete Order
    window.deleteOrder = (id) => {
        fetch(`/api/orders/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Order deleted successfully');
                document.getElementById('showOrders').click(); // Refresh order list
            } else {
                alert('Error deleting order');
            }
        });
    };

