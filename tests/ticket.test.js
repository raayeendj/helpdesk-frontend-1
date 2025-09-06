// tests/ticket.test.js

const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const ticketRoutes = require('../routes/ticketRoutes');
const Ticket = require('../models/Ticket');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  app = express();
  app.use(express.json());
  app.use('/api/tickets', ticketRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Ticket.deleteMany();
});

describe('POST /api/tickets', () => {
  it('doit créer un nouveau ticket', async () => {
    const newTicket = {
      requesterEmail: 'client@samauto.com',
      subject: 'Problème de climatisation',
      agent: 'Sami',
      status: 'Open',
      lastMessage: 'Client indique que la clim ne démarre plus'
    };

    const res = await request(app)
      .post('/api/tickets')
      .send(newTicket);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.subject).toBe(newTicket.subject);
  });
});
