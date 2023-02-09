import { AccountModel } from '@/src/domain/models/account';

export type MongoAccount = Omit<AccountModel, 'id'>;
