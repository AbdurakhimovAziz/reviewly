import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { Endpoints } from 'src/helpers/constants';
import { Public } from 'src/helpers/decorators';
import { RequestWithUser } from 'src/helpers/types';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';

@Controller(Endpoints.POSTS.BASE)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(Endpoints.POSTS.CREATE)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get(Endpoints.POSTS.GET_ALL)
  @Public()
  findAll(@Query() query: any) {
    const { limit, page, sortBy, tag } = query;
    return this.postsService.findAll(limit, page, sortBy, tag);
  }

  @Get(Endpoints.POSTS.GET_ONE)
  @Public()
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(Endpoints.POSTS.UPDATE)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(Endpoints.POSTS.DELETE)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @Post(Endpoints.POSTS.LIKE)
  like(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.postsService.like(id, req.user.sub);
  }
}
