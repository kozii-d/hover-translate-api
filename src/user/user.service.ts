import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOrUpdate(createUserDto: CreateUserDto): Promise<User> {
    const { googleId } = createUserDto;

    let user = await this.userRepository.findOne({
      where: { googleId },
    });

    if (user) {
      Object.assign(user, createUserDto);
      user.isLoggedIn = true;
    } else {
      user = this.userRepository.create(createUserDto);
    }

    return this.userRepository.save(user);
  }

  async logoutByGoogleId(googleId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { googleId } });

    if (!user) {
      throw new NotFoundException(`User with googleId ${googleId} not found`);
    }

    user.isLoggedIn = false;
    return await this.userRepository.save(user);
  }
}
