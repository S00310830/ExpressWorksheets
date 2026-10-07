import { createCarZSchema } from "../../models/cars";
import { describe, expect, it } from "vitest";

const validCar = {
    "make": "Una",
    "model": "0871234567",
    "year": 1980
}

describe('Test Car Validation', () => {
    it('should pass for the following valid data', () => {

        expect(() => createCarZSchema.parse(
            validCar)).not.toThrow();
    });

  it('should pass for the following valid data - no date', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "year": undefined })).not.toThrow();
    });

        it('should fail for the too early year ', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "year": 1949 })).toThrow();
    });

    it('should fail for the unparsaable year ', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "year": 'wrong year' })).toThrow();
    });

    it('should fail for the missing make ', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "make": undefined })).toThrow();
    });

    it('should fail for the missing model', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "model": undefined })).toThrow();
    });

    it('should fail for the missing make ', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "model": '' })).toThrow();
    });

    it('should accept the earliest supported year', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "year": 1950 })).not.toThrow();
    });

    it('should reject a year provided as a string', () => {

        expect(() => createCarZSchema.parse(
            { ...validCar, "year": '1950' })).toThrow();
    });
});
