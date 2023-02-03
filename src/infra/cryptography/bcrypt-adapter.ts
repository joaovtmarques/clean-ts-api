import bcrypt from 'bcrypt';

import { Encrypter } from '@/src/data/protocols/encrypter';

export class BcryptAdapter implements Encrypter {
  constructor(private readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    await bcrypt.hash(value, this.salt);

    return '';
  }
}
