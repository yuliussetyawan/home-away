import EmptyList from "@/components/home/EmptyList";
import { fetchPropertyReviewsByUser } from "@/utils/actions";
import FormContainer from '@/components/form/FormContainer';
import { IconButton } from '@/components/form/Buttons';
import Title from "@/components/properties/Title";
import ReviewCard from '@/components/reviews/ReviewCard';
import {
  deleteReviewAction,
} from '@/utils/actions';

async function ReviewsPages() {
  const reviews = await fetchPropertyReviewsByUser()
  if (reviews.length === 0) return <EmptyList />;

  return (
    <>
      <Title text='Your Reviews' />
      <section className='grid md:grid-cols-2 gap-8 mt-4 '>
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.property;
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          };
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  )
}


const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  // Create a pre-bound server action with the reviewId as argument
  // Equivalent to: () => deleteReviewAction({ reviewId })
  const deleteReview = deleteReviewAction.bind(null, { reviewId });
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
};

export default ReviewsPages;