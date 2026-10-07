import request from "supertest";
import { app } from "../../app";
import { CarModel } from "../../models/cars";
import { Types } from "mongoose";
import { randomUUID } from "node:crypto";
import { afterEach, describe, expect, it } from "vitest";

describe('GET /cars', () => {
    it('returns all cars', async () => {
        const response = await request(app)
            .get('/api/v1/cars');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
    });
});

describe('Car routes', () => {
    let testMakes: string[] = [];

    afterEach(async () => {
        if (testMakes.length > 0) {
            await CarModel.deleteMany({ make: { $in: testMakes } });
            testMakes = [];
        }
    });

    it('creates, retrieves, updates, and deletes a car', async () => {
        const make = `test-${randomUUID()}`;
        const updatedMake = `test-${randomUUID()}`;
        testMakes = [make, updatedMake];

        const created = await request(app)
            .post('/api/v1/cars')
            .send({ make, model: 'Integration Test Car', year: 2020 });

        expect(created.status).toBe(201);
        expect(created.body).toMatchObject({
            make,
            model: 'Integration Test Car',
            year: 2020,
        });
        expect(created.body._id).toEqual(expect.any(String));

        const id = created.body._id as string;
        const retrieved = await request(app).get(`/api/v1/cars/${id}`);

        expect(retrieved.status).toBe(200);
        expect(retrieved.body._id).toBe(id);

        const updated = await request(app)
            .put(`/api/v1/cars/${id}`)
            .send({ make: updatedMake, model: 'Updated Test Car', year: 2021 });

        expect(updated.status).toBe(200);
        expect(updated.body).toMatchObject({
            make: updatedMake,
            model: 'Updated Test Car',
            year: 2021,
        });

        const deleted = await request(app).delete(`/api/v1/cars/${id}`);

        expect(deleted.status).toBe(200);
        expect(deleted.body).toEqual({ message: 'Car deleted successfully' });

        const afterDelete = await request(app).get(`/api/v1/cars/${id}`);
        expect(afterDelete.status).toBe(404);
    });

    it('returns 400 for an invalid car when creating', async () => {
        const response = await request(app)
            .post('/api/v1/cars')
            .send({ make: 'Invalid Test Car', model: '', year: 1949 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Validation failed');
    });

    it('returns 404 when a car ID does not exist', async () => {
        const missingId = new Types.ObjectId().toString();

        const getResponse = await request(app).get(`/api/v1/cars/${missingId}`);
        const updateResponse = await request(app)
            .put(`/api/v1/cars/${missingId}`)
            .send({ make: 'Missing Car', model: 'Missing', year: 2020 });
        const deleteResponse = await request(app).delete(`/api/v1/cars/${missingId}`);

        expect(getResponse.status).toBe(404);
        expect(updateResponse.status).toBe(404);
        expect(deleteResponse.status).toBe(404);
    });
});
