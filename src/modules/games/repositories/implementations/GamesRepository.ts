import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const result = await this.repository
      .createQueryBuilder()
      .select("game")
      .from(Game, 'game')
      .where('game.title ILIKE :title', { title: `%${param}%` })
      .getMany()
    return result;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const [_, count] = await this.repository.findAndCount(); // Complete usando raw query
    return [{ count: count.toString() }]
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder()
      // Complete usando query builder
  }
}
