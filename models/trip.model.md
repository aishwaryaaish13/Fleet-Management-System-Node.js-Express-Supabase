## TRIP MODEl
## Table name
trips
## Desciptions
stores all trips details created by customers using vehicles 
## coolumns
create table trips (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references users(id) not null,
  vehicle_id uuid references vehicles(id) not null,
  start_date date not null,
  end_date date,
  location text,
  distance_km numeric,
  passengers int,
  tripCost numeric,
  isCompleted boolean default false,
  created_at timestamp default now()
);

Trip can be created onlu if vehicle is available .
passanger count must not exceeed vehicle
capacity
vehicle becomes unavialblre whern trip starts 
vehicle becomes avilable when trips ends

## relationship
Many trips belong to  one customer
many trips belong to one vehcile'