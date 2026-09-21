import { DemoBankData, DemoUser, MovementItem } from '../types/demo';

export const TEST_USER: DemoUser = {
  name: 'Alexandra Demo',
  email: 'demo@bancoflow.app',
  username: 'alexdemo',
  password: 'Demo1234',
};

export const DEFAULT_DEMO_DATA: DemoBankData = {
  holderName: 'Alexandra Demo',
  balance: 2845.72,
  accountNumber: '001-845739-02',
  cardLast4: '4821',
  expiryDate: '08/29',
  cvv: '482',
  cardType: 'Visa DEMO',
  cardStatus: 'Activa',
};

export const MOCK_MOVEMENTS: MovementItem[] = [
  {
    id: 'mov-1',
    description: 'Compra supermercado Nova',
    date: '21 Sep 2026, 09:42',
    amount: -46.8,
    type: 'Compra',
  },
  {
    id: 'mov-2',
    description: 'Transferencia recibida de Maria S.',
    date: '20 Sep 2026, 18:15',
    amount: 320,
    type: 'Transferencia',
  },
  {
    id: 'mov-3',
    description: 'Pago de servicio Internet hogar',
    date: '19 Sep 2026, 07:55',
    amount: -38.99,
    type: 'Pago',
  },
  {
    id: 'mov-4',
    description: 'Deposito DEMO quincena',
    date: '18 Sep 2026, 08:02',
    amount: 1250,
    type: 'Deposito',
  },
  {
    id: 'mov-5',
    description: 'Compra cafeteria Central',
    date: '17 Sep 2026, 11:20',
    amount: -7.25,
    type: 'Compra',
  },
  {
    id: 'mov-6',
    description: 'Pago streaming familiar',
    date: '16 Sep 2026, 20:43',
    amount: -11.99,
    type: 'Pago',
  },
];
