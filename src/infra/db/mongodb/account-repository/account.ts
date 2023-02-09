import { AddAccountRepository } from '@/src/data/protocols/add-account-repository';
import { AccountModel } from '@/src/domain/models/account';
import { AddAccountModel } from '@/src/domain/usecases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';
import { MongoAccount } from '../protocols/mongo';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const client = MongoHelper.getClient();

    const { insertedId } = await MongoHelper.getCollection(
      'accounts'
    ).insertOne(accountData);

    const account = await client
      .db()
      .collection<MongoAccount>('accounts')
      .findOne({
        _id: insertedId,
      });

    return MongoHelper.map(account);
  }
}
