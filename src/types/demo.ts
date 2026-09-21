export type DemoCardStatus = 'Activa' | 'Bloqueada';

export interface DemoUser {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface DemoBankData {
  holderName: string;
  balance: number;
  accountNumber: string;
  cardLast4: string;
  expiryDate: string;
  cvv: string;
  cardType: string;
  cardStatus: DemoCardStatus;
}

export interface MovementItem {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: 'Compra' | 'Transferencia' | 'Pago' | 'Deposito';
}
