import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetCurrentUserId } from 'common/decorators';
import { Portfolio } from './entities/portfolio.entity';
import { CreatePortfolioInput } from './inputs/create-portfolio.input';
import { UpdatePortfolioInput } from './inputs/update-portfolio.input';
import { PortfoliosService } from './portfolios.service';

@Resolver(() => Portfolio)
export class PortfoliosResolver {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Mutation(() => Portfolio)
  createPortfolio(
    @GetCurrentUserId() userId: string,
    @Args('data')
    createPortfolioInput: CreatePortfolioInput,
  ) {
    return this.portfoliosService.create(userId, createPortfolioInput);
  }

  @Query(() => [Portfolio])
  portfolio(@GetCurrentUserId() userId: string) {
    return this.portfoliosService.findAll(userId);
  }

  @Query(() => Portfolio)
  portfolios(
    @GetCurrentUserId() userId: string,
    @Args('uuid', { type: () => String }) uuid: string,
  ) {
    return this.portfoliosService.findOne(userId, uuid);
  }

  @Mutation(() => Portfolio)
  updatePortfolio(
    @GetCurrentUserId() userId: string,
    @Args('uuid', { type: () => String }) uuid: string,
    @Args('data')
    updatePortfolioInput: UpdatePortfolioInput,
  ) {
    return this.portfoliosService.update(userId, uuid, updatePortfolioInput);
  }

  @Mutation(() => Portfolio)
  removePortfolio(
    @GetCurrentUserId() userId: string,
    @Args('uuid', { type: () => String }) uuid: string,
  ) {
    return this.portfoliosService.remove(userId, uuid);
  }
}
