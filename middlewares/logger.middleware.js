import fs from 'fs';
 export const logger = (req, res, next) => {
   const log = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`
    fs.appendFile('logs.txt', log, (err) => {   
        if (err) {  
            console.error('Failed to write to log file:', err);
        }
    });
    next();
    }