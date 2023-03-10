import { DbAddAccount } from '@/src/data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '@/src/infra/cryptography/bcrypt-adapter';
import { AccountMongoRepository } from '@/src/infra/db/mongodb/account-repository/account';
import { SignUpController } from '@/src/presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '@/src/presentation/utils/email-validator-adapter';

export const makeSignUpController = (): SignUpController => {
  const salt = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountRepository);

  return new SignUpController(emailValidatorAdapter, dbAddAccount);
};
