import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Endpoints } from 'src/helpers/constants';
import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller(Endpoints.USERS.BASE)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(Endpoints.USERS.GET_ALL)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(Endpoints.USERS.GET_ONE)
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(Endpoints.USERS.UPDATE)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(Endpoints.USERS.DELETE)
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Get(Endpoints.USERS.GET_POSTS)
  getPosts(@Param('id') id: string) {
    return this.usersService.getPosts(id);
  }
}
