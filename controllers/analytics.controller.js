import { supabase } from '../supabase/client.js';

export const getAnalytics = async (req, res) => {
  try {
    // Example: Get total vehicles, trips, etc.
    const { data: vehicles, error: vError } = await supabase.from('vehicles').select('id', { count: 'exact' });
    const { data: trips, error: tError } = await supabase.from('trips').select('id', { count: 'exact' });
    if (vError || tError) return res.status(400).json({ error: 'Error fetching analytics' });
    res.json({ totalVehicles: vehicles.length, totalTrips: trips.length });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};