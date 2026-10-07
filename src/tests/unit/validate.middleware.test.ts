import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { validate } from '../../middleware/validate.middleware';
import { createCarZSchema } from '../../models/cars';

const app = express();
app.use(express.json());
app.post('/cars', validate(createCarZSchema), (_req, res) => {
    res.status(201).json({ message: 'Car accepted' });
});

describe('validate middleware', () => {
    it('passes valid car data to the route', async () => {
        const response = await request(app)
            .post('/cars')
            .send({ make: 'Renault', model: 'Megane', year: 2010 });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({ message: 'Car accepted' });
    });

    it('returns 400 with validation details for invalid car data', async () => {
        const response = await request(app)
            .post('/cars')
            .send({ make: 'Renault', model: '', year: 1949 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Validation failed');
        expect(response.body.errors).toEqual(expect.any(Array));
        expect(response.body.errors.length).toBeGreaterThan(0);
    });
});
