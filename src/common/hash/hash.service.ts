import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async genSalt(rounds: number): Promise<string> {
    return await bcrypt.genSalt(rounds);
  }

  async hash(
    plainText: string,
    saltOrRounds: string | number = 10,
  ): Promise<string> {
    return await bcrypt.hash(plainText, saltOrRounds);
  }

  async compare(plainText: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hash);
  }
}
