import supabase from './config/supabase.config.js';

// Create Order
export const addOrder = async (req, res) => {
  const { product_name, quantity, price, customerId } = req.body;

  if (!product_name || !quantity || !price || !customerId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('id', customerId)
    .single();

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const { data, error } = await supabase
    .from('orders')
    .insert([{ product_name, quantity, price, customer_id: customerId }])
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ order: data[0] });
};

// Get Customer Orders
export const getMyOrders = async (req, res) => {
  const { customerId } = req.params;

  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('id', customerId)
    .single();

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_id', customerId);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ orders: data });
};

// Update Order
export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { quantity, price, order_status } = req.body;

  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const { data, error } = await supabase
    .from('orders')
    .update({ quantity, price, order_status })
    .eq('id', orderId)
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ order: data[0] });
};

// Delete Order
export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const { data, error } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId);

  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(404).json({ error: 'Order not found' });

  res.status(200).json({ message: 'Order deleted successfully' });
};