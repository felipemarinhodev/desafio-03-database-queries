import { getRepository, ILike, Repository } from 'typeorm';
import { IFindUserByFullNameDTO, IFindUserWithGamesDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';


export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({
      relations: ['games'],
      where:{id: user_id}
    })
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const result = await this.repository.find({
      order: { first_name: 'ASC'}
    });
    return result;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const users = await this.repository.find({
      where: {
        first_name: ILike(`%${first_name}%`),
        last_name: ILike(`%${last_name}%`)
      }
    });
    return users;
  }
}
