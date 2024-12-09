import { CreateAuthorDto} from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { GetAuthorDto } from './dto/get-author.dto';
import { GetTopAuthorsDto } from './dto/get-top-authors.dto';
import { AuthorPaginator } from './dto/get-author.dto';
import { Author } from './entities/author.entity';
import { createAuthor, getAuthors, getAuthorBySlug, getTopAuthors, updateAuthor, removeAuthor } from './authors.service';

export function createAuthorRoute(createAuthorDto: CreateAuthorDto) {
  return createAuthor(createAuthorDto);
}

export async function getAuthorsRoute(query: GetAuthorDto): Promise<AuthorPaginator> {
  return getAuthors(query);
}

export async function getAuthorBySlugRoute(slug: string): Promise<Author> {
  return getAuthorBySlug(slug);
}

export function updateAuthorRoute(id: string, updateAuthorDto: UpdateAuthorDto) {
  return updateAuthor(+id, updateAuthorDto);
}

export function removeAuthorRoute(id: string) {
  return removeAuthor(+id);
}

export class TopAuthors {
  constructor() {}

  async getTopAuthorsRoute(query: GetTopAuthorsDto): Promise<Author[]> {
    return getTopAuthors(query);
  }
}
