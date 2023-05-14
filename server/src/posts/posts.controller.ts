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
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostsService } from './posts.service';
import { Public } from 'src/helpers/decorators';
import { RequestWithUser } from 'src/helpers/types';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @Public()
  findAll(@Query() query: any) {
    const { limit, page, sortBy, tag } = query;
    return this.postsService.findAll(limit, page, sortBy, tag);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  @Post(':id/like')
  like(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.postsService.like(id, req.user.sub);
  }
}
