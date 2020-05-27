// import { TestBed } from '@angular/core/testing';
// import { DateFunctionsService } from './date-functions.service';

// describe('DateFunctionsService', () => {
//   let service: DateFunctionsService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         DateFunctionsService,
//       ]
//     });
//     service = TestBed.inject(DateFunctionsService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('normalizeDate', () => {
//     it('dont change normal date', () => {
//       expect(service.normalizeDate(0, 2010)).toEqual({ month: 0, year: 2010, date: new Date(2010, 0, 1, 12) });
//       expect(service.normalizeDate(1, 1780)).toEqual({ month: 1, year: 1780, date: new Date(1780, 1, 1, 12) });
//       expect(service.normalizeDate(6, 900)).toEqual({ month: 6, year: 900, date: new Date(900, 6, 1, 12) });
//       expect(service.normalizeDate(11, 2150)).toEqual({ month: 11, year: 2150, date: new Date(2150, 11, 1, 12) });
//     });

//     it('plus one year', () => {
//       expect(service.normalizeDate(12, 2010)).toEqual({ month: 0, year: 2011, date: new Date(2011, 0, 1, 12) });
//       expect(service.normalizeDate(13, 1780)).toEqual({ month: 1, year: 1781, date: new Date(1781, 1, 1, 12) });
//       expect(service.normalizeDate(18, 900)).toEqual({ month: 6, year: 901, date: new Date(901, 6, 1, 12) });
//       expect(service.normalizeDate(23, 2150)).toEqual({ month: 11, year: 2151, date: new Date(2151, 11, 1, 12) });
//     });

//     it('plus several years', () => {
//       expect(service.normalizeDate(36, 2010)).toEqual({ month: 0, year: 2013, date: new Date(2013, 0, 1, 12) });
//       expect(service.normalizeDate(61, 1780)).toEqual({ month: 1, year: 1785, date: new Date(1785, 1, 1, 12) });
//       expect(service.normalizeDate(126, 900)).toEqual({ month: 6, year: 910, date: new Date(910, 6, 1, 12) });
//       expect(service.normalizeDate(335, 2150)).toEqual({ month: 11, year: 2177, date: new Date(2177, 11, 1, 12) });
//     });

//     it('minus one year', () => {
//       expect(service.normalizeDate(-1, 2010)).toEqual({ month: 11, year: 2009, date: new Date(2009, 11, 1, 12) });
//       expect(service.normalizeDate(-3, 1780)).toEqual({ month: 9, year: 1779, date: new Date(1779, 9, 1, 12) });
//       expect(service.normalizeDate(-6, 900)).toEqual({ month: 6, year: 899, date: new Date(899, 6, 1, 12) });
//       expect(service.normalizeDate(-11, 2150)).toEqual({ month: 1, year: 2149, date: new Date(2149, 1, 1, 12) });
//     });

//     it('minus several years', () => {
//       expect(service.normalizeDate(-21, 2010)).toEqual({ month: 3, year: 2008, date: new Date(2008, 3, 1, 12) });
//       expect(service.normalizeDate(-43, 1780)).toEqual({ month: 5, year: 1776, date: new Date(1776, 5, 1, 12) });
//       expect(service.normalizeDate(-56, 900)).toEqual({ month: 4, year: 895, date: new Date(895, 4, 1, 12) });
//       expect(service.normalizeDate(-111, 2150)).toEqual({ month: 9, year: 2140, date: new Date(2140, 9, 1, 12) });
//     });
//   });

//   describe('localizedGetDay', () => {
//     it('monday', () => {
//       expect(service.localizedGetDay(new Date(2020, 4, 4), 'ru')).toEqual(0);
//     });
//     it('friday', () => {
//       expect(service.localizedGetDay(new Date(2020, 4, 1), 'ru')).toEqual(4);
//     });
//     it('sunday', () => {
//       expect(service.localizedGetDay(new Date(2020, 4, 17), 'ru')).toEqual(6);
//     });
//   });

//   describe('createCalendarArray', () => {
//     it('may 2020', () => {
//       const result = service.createCalendarArray(4, 2020);

//       expect(result.length).toBe(35);
//       expect(result[3]).toBe(null);
//       expect(result[4]).toBe(1);
//       expect(result[34]).toBe(31);
//     });

//     it('january 2009', () => {
//       const result = service.createCalendarArray(0, 2009);

//       expect(result.length).toBe(35);
//       expect(result[2]).toBe(null);
//       expect(result[3]).toBe(1);
//       expect(result[33]).toBe(31);
//       expect(result[34]).toBe(null);
//     });

//     it('october 1985', () => {
//       const result = service.createCalendarArray(9, 1985);

//       expect(result.length).toBe(35);
//       expect(result[0]).toBe(null);
//       expect(result[1]).toBe(1);
//       expect(result[31]).toBe(31);
//     });

//     it('should call normalizeDate', () => {
//       spyOn(service, 'normalizeDate').and.returnValue({ month: 10, year: 1000, date: new Date(1000, 10, 1, 12) });
//       service.createCalendarArray(20, 1985);
//       expect(service.normalizeDate).toHaveBeenCalledWith(20, 1985);
//     });
//   });
// });
