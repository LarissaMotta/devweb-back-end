import {Controller, Get, Request} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('/')
@Controller('/')
export class IndexController {

    @Get()
    index(@Request() req): any {
        return {
            api: 'ok',
            status: 200
        }
    }
}
