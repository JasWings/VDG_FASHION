import { CreateFeedBackDto } from './dto/create-feedback.dto';
import { UpdateFeedBackDto } from './dto/update-feedback.dto';
import { FeedbackService } from './feedbacks.service';

// Function to get all feedbacks
export async function findAllFeedbacks() {
  const feedbackService = new FeedbackService(); // Create an instance of the service
  return feedbackService.findAllFeedBacks();
}

// Function to get a single feedback
export async function findFeedback(id: number) {
  const feedbackService = new FeedbackService(); // Create an instance of the service
  return feedbackService.findFeedBack(id);
}

// Function to create a new feedback
export async function createFeedback(createFeedBackDto: CreateFeedBackDto) {
  const feedbackService = new FeedbackService(); // Create an instance of the service
  return feedbackService.create(createFeedBackDto);
}

// Function to update a feedback
export async function updateFeedback(id: string, updateFeedBackDto: UpdateFeedBackDto) {
  const feedbackService = new FeedbackService(); // Create an instance of the service
  return feedbackService.update(+id, updateFeedBackDto);
}

// Function to delete a feedback
export async function deleteFeedback(id: string) {
  const feedbackService = new FeedbackService(); // Create an instance of the service
  return feedbackService.delete(+id);
}
