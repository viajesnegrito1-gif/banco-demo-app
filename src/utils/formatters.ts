export const sanitizeLast4 = (value: string) =>
  value.replace(/\D/g, '').slice(0, 4).padEnd(4, '0');

export const sanitizeCvv = (value: string) =>
  value.replace(/\D/g, '').slice(0, 3).padEnd(3, '0');

export const buildDemoCardNumber = (last4: string) =>
  `5274 1100 9988 ${sanitizeLast4(last4)}`;

export const maskCardNumber = (cardNumber: string, visible: boolean) =>
  visible ? cardNumber : '5274 1100 9988 ••••';

export const maskCvv = (cvv: string, visible: boolean) => (visible ? cvv : '•••');

export const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
