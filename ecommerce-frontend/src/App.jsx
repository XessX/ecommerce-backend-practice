import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [newOrder, setNewOrder] = useState({
    userId: '',
    productId: '',
    quantity: 1,
  });

  const [newUser, setNewUser] = useState({ username: '', email: '' });
  const [newProduct, setNewProduct] = useState({ name: '', price: 0 });

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const [u, p, o] = await Promise.all([
      axios.get('http://localhost:4000/users'),
      axios.get('http://localhost:4000/products'),
      axios.get('http://localhost:4000/orders'),
    ]);
    setUsers(u.data);
    setProducts(p.data);
    setOrders(o.data);
  };

  const createOrder = async () => {
    if (!newOrder.userId || !newOrder.productId || !newOrder.quantity) {
      alert('Please select all fields');
      return;
    }
    try {
      await axios.post('http://localhost:4000/orders', newOrder);
      alert('Order created!');
      setNewOrder({ userId: '', productId: '', quantity: 1 });
      getAllData();
    } catch (err) {
      alert('Failed to create order');
      console.error(err);
    }
  };

  const createUser = async () => {
    if (!newUser.username || !newUser.email) return alert('Missing user data');
    try {
      await axios.post('http://localhost:4000/users', newUser);
      alert('User created!');
      setNewUser({ username: '', email: '' });
      getAllData();
    } catch (err) {
      alert('Error creating user');
      console.error(err);
    }
  };

  const createProduct = async () => {
    if (!newProduct.name || newProduct.price <= 0)
      return alert('Invalid product data');
    try {
      await axios.post('http://localhost:4000/products', newProduct);
      alert('Product created!');
      setNewProduct({ name: '', price: 0 });
      getAllData();
    } catch (err) {
      alert('Error creating product');
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:4000/users/${id}`);
    getAllData();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:4000/products/${id}`);
    getAllData();
  };

  const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:4000/orders/${id}`);
    getAllData();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create Order</h2>

      <label>User:</label>
      <select
        value={newOrder.userId}
        onChange={(e) =>
          setNewOrder({ ...newOrder, userId: Number(e.target.value) })
        }
      >
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </select>

      <label>Product:</label>
      <select
        value={newOrder.productId}
        onChange={(e) =>
          setNewOrder({ ...newOrder, productId: Number(e.target.value) })
        }
      >
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <label>Quantity:</label>
      <input
        type="number"
        value={newOrder.quantity}
        onChange={(e) =>
          setNewOrder({ ...newOrder, quantity: Number(e.target.value) })
        }
      />

      <br />
      <button onClick={createOrder}>Create Order</button>

      <h2>All Orders</h2>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            {o.user?.username} ordered {o.quantity} × {o.product?.name}
            <button
              onClick={() => deleteOrder(o.id)}
              style={{ marginLeft: '10px' }}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>

      <hr />
      <h2>Add User</h2>
      <input
        placeholder="Username"
        value={newUser.username}
        onChange={(e) =>
          setNewUser({ ...newUser, username: e.target.value })
        }
      />
      <input
        placeholder="Email"
        value={newUser.email}
        onChange={(e) =>
          setNewUser({ ...newUser, email: e.target.value })
        }
      />
      <button onClick={createUser}>Add User</button>

      <h2>All Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.username} ({u.email})
            <button
              onClick={() => deleteUser(u.id)}
              style={{ marginLeft: '10px' }}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>

      <hr />
      <h2>Add Product</h2>
      <input
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) =>
          setNewProduct({ ...newProduct, name: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) =>
          setNewProduct({ ...newProduct, price: Number(e.target.value) })
        }
      />
      <button onClick={createProduct}>Add Product</button>

      <h2>All Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
            <button
              onClick={() => deleteProduct(p.id)}
              style={{ marginLeft: '10px' }}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
