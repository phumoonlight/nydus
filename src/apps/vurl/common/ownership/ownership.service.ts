import { Injectable } from '@nestjs/common';
import { Ownership } from './ownership.type';

@Injectable()
export class OwnershipService {
  create(userId: string, itemId: string): Ownership {
    return {
      userId,
      itemId,
    };
  }
}
