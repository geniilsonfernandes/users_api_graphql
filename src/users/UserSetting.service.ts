import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GraphQLError } from 'graphql';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { CreateUserSettingsInput } from 'src/graphql/utils/CreateUserSettingsInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingsRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserSettingById(id: number) {
    return this.userSettingsRepository.findOneBy({ userId: id });
  }

  async createUserSetting(createUserSettingData: CreateUserSettingsInput) {
    const findUser = await this.userRepository.findOneBy({
      id: createUserSettingData.userId,
    });

    if (!findUser)
      throw new GraphQLError('User Not Found', {
        extensions: {
          code: 'BAD_USER_INPUT',
          location: 'User Not Found',
        },
      });

    const newUserSetting = this.userSettingsRepository.create(
      createUserSettingData,
    );
    const savedSettings =
      await this.userSettingsRepository.save(newUserSetting);

    findUser.settings = savedSettings;
    await this.userRepository.save(findUser);

    return savedSettings;
  }
}
