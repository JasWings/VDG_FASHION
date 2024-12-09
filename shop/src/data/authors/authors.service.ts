import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import authorsJson from '../db/pickbazar/authors.json';
import { Author } from './entities/author.entity';
import { plainToClass } from 'class-transformer';
import Fuse from 'fuse.js';
import { GetAuthorDto } from './dto/get-author.dto';
import { paginate } from '../common/pagination/paginate';
import { GetTopAuthorsDto } from './dto/get-top-authors.dto';

const authors = plainToClass(Author, authorsJson);

const options = {
  keys: ['name', 'slug'],
  threshold: 0.3,
};

const fuse = new Fuse(authors, options);

export function createAuthor(createAuthorDto: CreateAuthorDto) {
  return authors[0];
}

export function getAuthors({ page, limit, search }: GetAuthorDto) {
  if (!page) page = 1;
  if (!limit) limit = 30;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let data: Author[] = authors;
  if (search) {
    const parseSearchParams = search.split(';');
    for (const searchParam of parseSearchParams) {
      const [key, value] = searchParam.split(':');
      data = fuse.search(value)?.map(({ item }) => item);
    }
  }

  const results = data.slice(startIndex, endIndex);

  const url = `/authors?search=${search}&limit=${limit}`;
  return {
    data: results,
    ...paginate(data.length, page, limit, results.length, url),
  };
}

export function getAuthorBySlug(slug: string) {
  return authors.find((p) => p.slug === slug);
}

export async function getTopAuthors({ limit = 10 }: GetTopAuthorsDto): Promise<Author[]> {
  return authors.slice(0, limit);
}

export function updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto) {
  const author = authors.find((p) => p.id === Number(id));

  // Update author
  author.is_approved = updateAuthorDto.is_approved ?? true;

  return author;
}

export function removeAuthor(id: number) {
  return `This action removes a #${id} product`;
}
