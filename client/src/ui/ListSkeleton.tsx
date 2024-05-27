import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ListSkeleton = ({ cards }: { cards: number }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="flex gap-6">
        <div>
          <Skeleton width={150} height={150} />
        </div>
        <div>
          <Skeleton width={400} />
          <Skeleton width={350} />
          <Skeleton width={300} />
        </div>
      </div>
    ));
};
export default ListSkeleton;
