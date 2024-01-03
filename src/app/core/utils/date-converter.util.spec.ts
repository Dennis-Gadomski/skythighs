import { DateConverterUtil } from "./date-converter.util";

describe('DateConverterUtil', () => {

    it('should correctly convert a standard date to MySQL format', () => {
        const input = new Date('2020-01-01T01:01:01Z');
        expect(DateConverterUtil.convertDateToMysqlDate(input)).toEqual('2020-01-01 01:01:01');
    });

    it('should correctly handle leap years', () => {
        const input = new Date('2024-02-29T12:30:45Z');
        expect(DateConverterUtil.convertDateToMysqlDate(input)).toEqual('2024-02-29 12:30:45');
    });

    it('should correctly convert end of month dates', () => {
        const input = new Date('2023-04-30T23:59:59Z');
        expect(DateConverterUtil.convertDateToMysqlDate(input)).toEqual('2023-04-30 23:59:59');
    });

    it('should throw error for invalid date inputs', () => {
        expect(() => DateConverterUtil.convertDateToMysqlDate(new Date('invalid-date'))).toThrow();
    });
});
