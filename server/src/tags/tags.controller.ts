import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/helpers/decorators';
import { CreateTagDto } from './dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @Public()
  findAll(@Query('limit') limit: number) {
    return this.tagsService.findMostUsed(limit);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }
}
