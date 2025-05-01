import express from 'express';
import cors from 'cors';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json())

app.get('/users', async(req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/products', async(req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});
app.get('/orders', async (req, res) => {
const orders = await prisma.order.findMany({
  include: {
    user: true,
    product: true
  }
});
res.json(orders)
});

app.post('/users', async (req, res) => {
try {
  const { username, email } = req.body;
  const user = await prisma.user.create({
    data: { username, email },
  });
  res.json(user);
} catch (err) {
  res.status(400).json({error: err.message});
}
});

app.post('/products', async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await prisma.product.create({
      data: { name, price },
    });
    res.json(product);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
  });
  
  app.post('/orders', async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
      if (!userId || !productId || !quantity){
        return res.status(400).json({error: 'Missing data'});
      }
      const order = await prisma.order.create({
        data: {userId, productId, quantity}
      });
      res.json(order);
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  });

  app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
      await prisma.user.delete({ where: { id } });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  app.delete('/products/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
      await prisma.product.delete({ where: { id } });
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  app.delete('/orders/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
      await prisma.order.delete({ where: { id } });
      res.json({ message: 'Order deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
