import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/graphql/models/User';

import { UserSetting } from 'src/graphql/models/UserSetting';
import { UserResolver } from './User.resolver';
import { UserService } from './User.service';
import { UserSettingService } from './UserSetting.Service';
import { UserSettingsResolver } from './UserSettings.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [
    UserResolver,
    UserSettingsResolver,
    UserService,
    UserSettingService,
  ],
})
export class UserModule {}
