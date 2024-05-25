import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonCard = ({ cards }: { cards: number }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div key={index}>
        <div>
          <Skeleton width={250} className="h-[150px]" />
        </div>
        <div>
          <Skeleton width={230} />
          <Skeleton width={200} />
          <Skeleton width={180} />
        </div>
      </div>
    ));
};
export default SkeletonCard;
