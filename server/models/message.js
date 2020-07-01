import connection from '../config/db.js';
import moment from '../config/moment.js'

export default class Message {

    constructor(row){
        this.row  = row
    }

    get created_at ( ) {
        return moment(this.row.created_at).fromNow()
    }


    static create (username, room, message,  callback) {
        connection.query('INSERT INTO messages SET username = ?, room = ?, message =?', [username, room, message], (error, results)=>{
            if(error) throw error; 
            callback(results);
        });
    }

    static getAllInRoom(room, callback){
        connection.query('SELECT * FROM messages WHERE room = ? ORDER BY created_at DESC LIMIT 10', [room], (error, rows)=>{
            if (error) throw error
            
            callback(JSON.parse(JSON.stringify(rows)).map((message)=> new Message(message)))
            
        })
    }

    static getById(id, callback) {
        connection.query("SELECT * FROM messages WHERE id = ? LIMIT 1", [id], (error, rows)=> {
            if (error) throw error
            callback(new Message(rows[0]))
        })
    }
}

