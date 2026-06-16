import {
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from "@mui/material";
import type { Review } from "../../models/product";

export interface ReviewCardProps {
  review: Review;
}
export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card variant="elevation" sx={{border: "2px solid #ccc"}}>
      <CardHeader title={review.reviewerName} subheader={review.date} />
      <CardContent>
        <Rating name="read-only" value={review.rating} readOnly />
        <Typography>({review.comment})</Typography>
      </CardContent>
    </Card>
  );
};
