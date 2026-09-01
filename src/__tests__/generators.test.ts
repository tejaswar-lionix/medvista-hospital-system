import { generateOTP, generatePatientId, generateAppointmentId, generateBillNumber, generatePrescriptionId } from '@/lib/generators';

describe('Generator Functions', () => {
  describe('generateOTP', () => {
    it('generates 6-digit OTP', () => {
      const otp = generateOTP();
      expect(otp).toHaveLength(6);
      expect(/^\d{6}$/.test(otp)).toBe(true);
    });

    it('generates different OTPs on each call', () => {
      const otp1 = generateOTP();
      const otp2 = generateOTP();
      expect(otp1).not.toBe(otp2);
    });
  });

  describe('generatePatientId', () => {
    it('generates patient ID with PAT prefix', () => {
      const id = generatePatientId();
      expect(id).toMatch(/^PAT-\d+$/);
    });

    it('generates unique IDs', () => {
      const id1 = generatePatientId();
      const id2 = generatePatientId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('generateAppointmentId', () => {
    it('generates appointment ID with APT prefix', () => {
      const id = generateAppointmentId();
      expect(id).toMatch(/^APT-\d+$/);
    });

    it('generates unique IDs', () => {
      const id1 = generateAppointmentId();
      const id2 = generateAppointmentId();
      expect(id1).not.toBe(id2);
    });
  });

  describe('generateBillNumber', () => {
    it('generates bill number with BILL prefix', () => {
      const billNumber = generateBillNumber();
      expect(billNumber).toMatch(/^BILL-\d+$/);
    });

    it('generates unique bill numbers', () => {
      const bill1 = generateBillNumber();
      const bill2 = generateBillNumber();
      expect(bill1).not.toBe(bill2);
    });
  });

  describe('generatePrescriptionId', () => {
    it('generates prescription ID with RX prefix', () => {
      const id = generatePrescriptionId();
      expect(id).toMatch(/^RX-\d+$/);
    });

    it('generates unique IDs', () => {
      const id1 = generatePrescriptionId();
      const id2 = generatePrescriptionId();
      expect(id1).not.toBe(id2);
    });
  });
});
