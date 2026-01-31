import { supabase } from '../supabase/client.js';

export const createTrip = async (req, res) => {
  try {
    const { vehicle_id, driver_id, start_location, end_location } = req.body;
    const { data, error } = await supabase.from('trips').insert([{ vehicle_id, driver_id, start_location, end_location, status: 'ongoing' }]);
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json({ message: 'Trip created', data });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const { tripid } = req.params;
    const updates = req.body;
    const { data, error } = await supabase.from('trips').update(updates).eq('id', tripid);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Trip updated', data });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTrip = async (req, res) => {
  try {
    const { tripid } = req.params;
    const { data, error } = await supabase.from('trips').select('*').eq('id', tripid).single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const { tripid } = req.params;
    const { error } = await supabase.from('trips').delete().eq('id', tripid);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Trip deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const endTrip = async (req, res) => {
  try {
    const { tripid } = req.params;
    const { data, error } = await supabase.from('trips').update({ status: 'completed' }).eq('id', tripid);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Trip ended', data });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};