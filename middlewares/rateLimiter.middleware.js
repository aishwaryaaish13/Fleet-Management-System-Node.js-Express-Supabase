import ratelimit from 'express-rate-limit';
export const vehicleLimiter = ratelimit({
    windowMs: 15 * 60 * 1000,
    max: 10, 
    message: 'Too many vehicle creation requests from this IP, please try again after 15 minutes'
});