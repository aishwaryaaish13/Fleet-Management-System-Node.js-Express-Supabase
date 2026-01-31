## Vehicle Model

## Table Name
vehicle
 ## description
 stores all vehicles added by owners
 each vehicle belongs to one owner and can optionally have one driver

 # Columns 
 create table vehicles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  registration_number text unique not null,
  allowed_passengers int not null,
  isAvailable boolean default true,
  driver_id uuid references users(id),
  rate_per_km numeric not null,
  owner_id uuid references users(id) not null,
  created_at timestamp default now()
);
 ## contraints 
 registeration numner must be unique
 vehicle availability is managed by trip lifecycle
 ## relationship
 many vehicle belong to one owner
 one vehicle cAN HAVE ONE DRIVEER
 one vehicle can have many trips over time
 