import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from './user/model/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  console.log('current user decorator 되');
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
