import { supabase } from '../supabase/client.js';


export const addVehicle = async (req, res) => {
  try {
    const {
      name,
      registration_number,
      allowed_passengers,
      rate_per_km,
      owner_id
    } = req.body;

    
    if (!name || !registration_number || !allowed_passengers || !rate_per_km || !owner_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    
    const { data: owner, error: ownerError } = await supabase
      .from('users')
      .select('role')
      .eq('id', owner_id)
      .single();

    if (ownerError || !owner || owner.role !== 'owner') {
      return res.status(403).json({ message: 'Only owners can add vehicles' });
    }

    
    const { data, error } = await supabase
      .from('vehicles')
      .insert([
        {
          name,
          registration_number,
          allowed_passengers,
          rate_per_km,
          owner_id
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Vehicle added successfully',
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * ASSIGN DRIVER TO VEHICLE
 */
export const assignDriver = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { driver_id } = req.body;

    if (!driver_id) {
      return res.status(400).json({ message: 'Driver ID is required' });
    }


    const { data: driver, error: driverError } = await supabase
      .from('users')
      .select('role')
      .eq('id', driver_id)
      .single();

    if (driverError || !driver || driver.role !== 'driver') {
      return res.status(400).json({ message: 'Invalid driver' });
    }

    const { data, error } = await supabase
      .from('vehicles')
      .update({ driver_id })
      .eq('id', vehicleId)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Driver assigned successfully',
      data
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getVehicle = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', vehicleId)
      .single();

    if (error) {
      return res.status(404).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
