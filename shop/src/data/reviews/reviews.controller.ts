import { GetReviewsDto } from './dto/get-reviews.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './reviews.service';

export async function findAllReviews(query: GetReviewsDto, reviewService: ReviewService): Promise<any> {
  return reviewService.findAllReviews(query);
}

export function findReview(id: string, reviewService: ReviewService): any {
  return reviewService.findReview(+id);
}

export function createReview(createReviewDto: CreateReviewDto, reviewService: ReviewService): any {
  return reviewService.create(createReviewDto);
}

export function updateReview(id: string, updateReviewDto: UpdateReviewDto, reviewService: ReviewService): any {
  return reviewService.update(+id, updateReviewDto);
}

export function deleteReview(id: string, reviewService: ReviewService): any {
  return reviewService.delete(+id);
}
