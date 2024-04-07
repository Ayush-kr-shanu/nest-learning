import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private readonly cats = ['cat 1', 'cat 2', 'cat 3', 'cat 4', 'cat 5'];

  findAll(): string[] {
    return this.cats.length ? this.cats: [];
  }

  create(name: string): void {
    this.cats.push(name);
  }
}
