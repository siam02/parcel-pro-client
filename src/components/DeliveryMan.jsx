import { FaRegStar, FaStar } from "react-icons/fa6";
import Rating from "react-rating";

const DeliveryMan = ({man}) => {

    const {averageRating, deliveredCount, photo, name} = man;
    
    return (
        <div className="p-4 lg:w-1/3 md:w-1/2">
            <div className="h-full flex flex-col items-center text-center">
                <img
                    alt="team"
                    className="flex-shrink-0 rounded-full h-36 w-36 object-cover object-center mb-4"
                    src={photo}
                />
                <div className="w-full">
                    <h2 className="title-font font-medium text-2xl text-gray-900">
                        {name}
                    </h2>
                    <p className="mb-4 flex gap-2 text-gray-700 mt-1 items-center justify-center">
                        <span>Delivered: {deliveredCount} &#x2022; </span><Rating readonly className="text-primary" emptySymbol={<FaRegStar />} fullSymbol={<FaStar />} initialRating={averageRating}></Rating>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DeliveryMan;