const isValidLength = (str, min, max) => {
    return typeof str === 'string' && str.length >= min && str.length <= max;
  };
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidAge = (age) => {
    return Number.isInteger(age) && age > 0 && age < 120;
  };
  
  const isPositive = (num) => {
    return typeof num === 'number' && num > 0;
  };
  
  const isValidDate = (date, start, end) => {
    const parsedDate = new Date(date);
    return parsedDate >= new Date(start) && parsedDate <= new Date(end);
  };
  
  describe('Validation Tests', () => {
    test('name, surname, product, description should be between 3 and 255 characters', () => {
      expect(isValidLength('John', 3, 255)).toBe(true);
      expect(isValidLength('JD', 3, 255)).toBe(false);
      expect(isValidLength('A'.repeat(256), 3, 255)).toBe(false);
    });
  
    test('email should be valid', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
    });
  
    test('age should be positive and less than 120', () => {
      expect(isValidAge(25)).toBe(true);
      expect(isValidAge(-1)).toBe(false);
      expect(isValidAge(130)).toBe(false);
    });
  
    test('price should be positive', () => {
      expect(isPositive(19.99)).toBe(true);
      expect(isPositive(-19.99)).toBe(false);
    });
  
    test('date should be valid between January 1, 2000 and June 20, 2024', () => {
      expect(isValidDate('2023-06-15', '2000-01-01', '2024-06-20')).toBe(true);
      expect(isValidDate('1999-12-31', '2000-01-01', '2024-06-20')).toBe(false);
      expect(isValidDate('2024-06-21', '2000-01-01', '2024-06-20')).toBe(false);
    });
  });
  