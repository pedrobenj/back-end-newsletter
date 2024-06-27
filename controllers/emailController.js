import { db } from "../config/firebase.js"
import postgres from "../config/postgres.js";
import { Resend } from "resend";
import EmailRepository from "../repositories/emailReposiroty.js";

const RESEND_KEY = process.env.RESEND_KEY;

const EmailController = {
    getEmails: async (req, res) => {
        const result = await EmailRepository(db);

        res.json(result);
        return
    },

    registerEmail: async (req, res) => {
        const {email, name} = req.body;

        const result = await EmailRepository.registerEmail(db, email, name);

        return res.json(result);
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