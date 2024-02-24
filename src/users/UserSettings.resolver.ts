import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSetting } from '../graphql/models/UserSetting';
import { CreateUserSettingsInput } from '../graphql/utils/CreateUserSettingsInput';
import { UserSettingService } from './UserSetting.Service';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingService: UserSettingService) {}

  @Mutation(() => UserSetting)
  createUserSettings(
    @Args('CreateUserSettingsData')
    CreateUserSettingsData: CreateUserSettingsInput,
  ) {
    const userSetting = this.userSettingService.createUserSetting(
      CreateUserSettingsData,
    );
    return userSetting;
  }
}
