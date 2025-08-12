
import type { Request, Response } from 'express';
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    from: 'jacquelyn.mayer55@ethereajl.email',
    port: 587,
    auth: {
        user: 'jacquelyn.mayer55@ethereal.email',
        pass: 'h478ERvX29YRaNTV1m'
    }
});

// Simple in-memory rate limiter (per IP)
const emailRateLimit: { [ip: string]: number } = {};
const EMAIL_COOLDOWN_MS = 60 * 1000; // 1 minute

app.post('/api/send', async (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || '';
    const now = Date.now();
    if (emailRateLimit[ip] && now - emailRateLimit[ip] < EMAIL_COOLDOWN_MS) {
        return res.status(429).json({ error: 'Por favor, aguarde antes de enviar outro email.' });
    }
    emailRateLimit[ip] = now;

    const { name, email, phone, message } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }
    try {
        await transporter.sendMail({
            to: 'azorofox@hotmail.com',
            subject: 'Novo interesse em workshop de pizza',
            text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone || ''}\nMensagem: ${message || ''}`,
            html: `<h2>Novo interesse em workshop de pizza</h2><ul><li><b>Nome:</b> ${name}</li><li><b>Email:</b> ${email}</li><li><b>Telefone:</b> ${phone || ''}</li><li><b>Mensagem:</b> ${message || ''}</li></ul>`
        });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao enviar email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
