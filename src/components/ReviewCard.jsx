import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa6";

const ReviewCard = ({ review }) => {
    return (
        <div>
            <Card>
                <CardContent>
                    <div className="flex justify-center gap-2 flex-col mt-6">
                        <img src={review.userImage} alt="" className=" mx-auto rounded-full w-16 h-16" />
                        <p className="text-center text-lg font-medium">{review.userName}</p>
                        <p className="text-center text-sm">{review.feedback}</p>
                        <div className="flex items-center gap-2 justify-center text-sm">
                            <p>{review.reviewDate}</p>
                            <p>&#x2022;</p>
                            <Rating
                                emptySymbol={<FaRegStar />}
                                fullSymbol={<FaStar />}
                                readonly
                                initialRating={review.rating}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReviewCard;