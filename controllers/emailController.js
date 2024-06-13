import { db } from "../config/firebase.js"
import postgres from "../config/postgres.js";

const EmailController = {
    getEmails: async (req, res) => {
        const result = await postgres.query('SELECT * FROM emails');

        res.json(result.rows);
        return
    },

    registerEmail: async (req, res) => {
        const {email, name} = req.body;

        const result = await postgres.query('INSERT INTO emails (email, name) VALUES ($1, $2) RETURNING *', [email, name]);

        res.json(result.rows[0]);
        return
    }
}

export default EmailController;