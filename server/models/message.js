import connection from '../config/db.js';

const create = (username, room, message,  callback) => {
    connection.query('INSERT INTO messages SET username = ?, room = ?, message =?', [username, room, message], (error, results)=>{
        if(error) throw error; 
        callback(results);
    });
}

export default create

