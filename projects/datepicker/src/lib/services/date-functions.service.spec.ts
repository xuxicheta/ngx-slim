import { TestBed } from '@angular/core/testing';
import { DateFunctionsService } from './date-functions.service';

describe('DateFunctionsService', () => {
  let service: DateFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateFunctionsService]
    });
    service = TestBed.inject(DateFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('normalizeDate', () => {
    it('dont change normal date', () => {
      expect(service.normalizeDate(0, 2010)).toEqual({ month: 0, year: 2010 });
      expect(service.normalizeDate(1, 1780)).toEqual({ month: 1, year: 1780 });
      expect(service.normalizeDate(6, 900)).toEqual({ month: 6, year: 900 });
      expect(service.normalizeDate(11, 2150)).toEqual({ month: 11, year: 2150 });
    });

    it('plus one year', () => {
      expect(service.normalizeDate(12, 2010)).toEqual({ month: 0, year: 2011 });
      expect(service.normalizeDate(13, 1780)).toEqual({ month: 1, year: 1781 });
      expect(service.normalizeDate(18, 900)).toEqual({ month: 6, year: 901 });
      expect(service.normalizeDate(23, 2150)).toEqual({ month: 11, year: 2151 });
    });

    it('plus several years', () => {
      expect(service.normalizeDate(36, 2010)).toEqual({ month: 0, year: 2013 });
      expect(service.normalizeDate(61, 1780)).toEqual({ month: 1, year: 1785 });
      expect(service.normalizeDate(126, 900)).toEqual({ month: 6, year: 910 });
      expect(service.normalizeDate(335, 2150)).toEqual({ month: 11, year: 2177 });
    });

    it('minus one year', () => {
      expect(service.normalizeDate(-1, 2010)).toEqual({ month: 11, year: 2009 });
      expect(service.normalizeDate(-3, 1780)).toEqual({ month: 9, year: 1779 });
      expect(service.normalizeDate(-6, 900)).toEqual({ month: 6, year: 899 });
      expect(service.normalizeDate(-11, 2150)).toEqual({ month: 1, year: 2149 });
    });

    it('minus several years', () => {
      expect(service.normalizeDate(-21, 2010)).toEqual({ month: 3, year: 2008 });
      expect(service.normalizeDate(-43, 1780)).toEqual({ month: 5, year: 1776 });
      expect(service.normalizeDate(-56, 900)).toEqual({ month: 4, year: 895 });
      expect(service.normalizeDate(-111, 2150)).toEqual({ month: 9, year: 2140 });
    });
  });

  describe('localizedGetDay', () => {
    it('monday', () => {
      expect(service.localizedGetDay(new Date(2020, 4, 4))).toEqual(0);
    });
    it('friday', () => {
      expect(service.localizedGetDay(new Date(2020, 4, 1))).toEqual(4);
    });
    it('sunday', () => {
      expect(service.localizedGetDay(new Date(2020, 4, 17))).toEqual(6);
    });
  })
});
