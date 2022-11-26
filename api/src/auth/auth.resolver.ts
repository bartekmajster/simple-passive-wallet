import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { GetCurrentUser, GetCurrentUserId, Public } from 'common/decorators';
import { RtGuard } from 'common/guards';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { Email, User } from './entities';
import { EmailInput, SigninInput, SignupInput } from './inputs';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => User)
  signupLocal(
    @Args('data')
    signupInput: SignupInput,
    @Context('res') res: Response,
  ): Promise<User> {
    return this.authService.signupLocal(signupInput, res);
  }

  @Public()
  @Mutation(() => User)
  signinLocal(
    @Args('data')
    signinInput: SigninInput,
    @Context('res') res: Response,
  ): Promise<User> {
    return this.authService.signinLocal(signinInput, res);
  }

  @Public()
  @Query(() => Email)
  emailExist(
    @Args('data')
    emailInput: EmailInput,
  ): Promise<Email> {
    return this.authService.checkEmail(emailInput);
  }

  @Query(() => User)
  user(@GetCurrentUserId() userId: string): Promise<User> {
    return this.authService.getAccount(userId);
  }

  /*

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUserId() userId: string,
    @Res() res: Response,
  ): Promise<unknown> {
    return this.authService.logout(userId, res);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res() res: Response,
  ): Promise<unknown> {
    return this.authService.refreshToken(userId, refreshToken, res);
  } */
}
