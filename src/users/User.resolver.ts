import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';
import { User } from '../graphql/models/User';
import { UserService } from './User.service';
import { UserSettingService } from './UserSetting.Service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userSettingService: UserSettingService,
  ) {}

  //  como essa query pode ser nula, temos que usar o nullable
  //  para o GraphQL,  mesma coisa para o arg, que ele recebe um
  // number mas temos que passar para um int
  @Query(() => User, { nullable: true, name: 'userById' })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User], { nullable: true, name: 'getUsers' })
  async getUsers() {
    return this.userService.getUsers();
  }

  // @ResolveField(() => UserSetting, { name: 'settings', nullable: true })
  // getUserSettings(@Parent() user: User) {
  //   return this.userSettingService.getUserSettingById(user.id);
  // }

  @Mutation(() => User)
  createUser(@Args('CreateUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }
}
