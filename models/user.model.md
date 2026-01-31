# USER MODEL
## Table Name

### Description
stores all user of the fleet management system
each user can have only one role:customer,owner,or driver

## columns 
create table users (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text unique not null,
  password text not null,
  role text not null check (role in ('customer','owner','driver')),
  created_at timestamp default now()
);

## contraints
email must be unique;
role must be one of : customer,owner or driver.

## Relationship
one owner can own multiple vechicles
one driver can be assigned to one vechicle
one customer can create multiple trips