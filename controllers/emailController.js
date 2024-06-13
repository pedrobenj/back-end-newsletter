import { db } from "../config/firebase.js"
import postgres from "../config/postgres.js";
import { Resend } from "resend";

const RESEND_KEY = "re_KsaNuZa3_M6wLLFVnHVeGaLZ1fcJxuRU2";

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
    },

    sentEmail: async (req, res) => {
        const {email, subject, message} = req.body;

        const resend = new Resend(RESEND_KEY);

        resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: subject,
            text: message
        }).then(response => {
            res.json(response);
        }).catch(error => {
            res.json(error);
        });
    }
}

export default EmailController;