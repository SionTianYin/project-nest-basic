// nest g mi validade-login --no-spec
// npm i cookie-parser

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ValidateLoginMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.cookies.token) next();
    else {
      throw new UnauthorizedException();
    }
  }
}
