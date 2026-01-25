import supabase from '../config/supabase.config.js';

// Register Customer
export const registerCustomer = async (req, res) => {
  const { full_name, email, phone } = req.body;

  if (!full_name || !email || !phone) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const { data: existing } = await supabase
    .from('customers')
    .select('*')
    .eq('email', email)
    .single();

  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  const { data, error } = await supabase
    .from('customers')
    .insert([{ full_name, email, phone }])
    .select();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ customer: data[0] });
};

// Delete Customer
export const deleteCustomer = async (req, res) => {
  const { customerId } = req.params;

  const { data, error } = await supabase
    .from('customers')
    .delete()
    .eq('id', customerId);

  if (error) return res.status(500).json({ error: error.message });
  if (!data.length) return res.status(404).json({ error: 'Customer not found' });

  res.status(200).json({ message: 'Customer deleted successfully' });
};