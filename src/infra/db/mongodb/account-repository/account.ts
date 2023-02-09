import { AddAccountRepository } from '@/src/data/protocols/add-account-repository';
import { AccountModel } from '@/src/domain/models/account';
import { AddAccountModel } from '@/src/domain/usecases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';
import { MongoAccount } from '../protocols/mongo';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getClient();

    const { insertedId } = await accountCollection
      .db()
      .collection('accounts')
      .insertOne(accountData);

    const account = await accountCollection
      .db()
      .collection<MongoAccount>('accounts')
      .findOne({
        _id: insertedId,
      });

    if (!account) {
      throw new Error('Account not created');
    }

    const { _id, ...rest } = account;

    return { id: _id.toHexString(), ...rest };
  }
}
