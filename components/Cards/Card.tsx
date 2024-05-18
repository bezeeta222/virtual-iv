import { PanInfo, motion } from "framer-motion";
import { useState } from "react";
import { UserType, SwipeType } from "../../type/index.d";
import { CircularProgress } from "@mui/material";

interface CardProps {
  user: UserType;
  removeCard: (user: UserType, swipe: SwipeType) => void;
  active: boolean;
}

const Card: React.FC<CardProps> = ({ user, removeCard, active }) => {
  const [leaveX, setLeaveX] = useState(0);
  const [leaveY, setLeaveY] = useState(0);
  const [loading, setLoading] = useState(true);

  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.y < -100) {
      setLeaveY(-2000);
      removeCard(user, "superlike");
      return;
    }
    if (info.offset.x > 100) {
      setLeaveX(1000);
      removeCard(user, "like");
    }
    if (info.offset.x < -100) {
      setLeaveX(-1000);
      removeCard(user, "nope");
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const classNames = `absolute h-[500px] w-[350px] bg-white shadow-xl rounded-2xl flex flex-col cursor-grab overflow-hidden`;

  return (
    <>
      {active ? (
        <motion.div
          drag={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={onDragEnd}
          initial={{
            scale: 1,
          }}
          animate={{
            scale: 1.05,
            rotate: `${user.name.length % 2 === 0 ? 6 : -6}deg`,
          }}
          exit={{
            x: leaveX,
            y: leaveY,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          className={classNames}
          data-testid="active-card"
        >
          <div className="relative w-full h-2/3 flex justify-center items-center">
            {loading && <CircularProgress />}
            <img
              src={user.profile_picture_url}
              alt={user.name}
              className="absolute w-full h-full object-cover"
              onLoad={handleImageLoad}
              draggable={false}
            />
          </div>
          <div className="p-4 overflow-y-auto">
            <Title title={user.name} color={"#000"} />
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.gender}</p>
            <p className="text-sm text-gray-600">{user.location}</p>
            <p className="text-sm text-gray-600">{user.university}</p>
            <p className="text-sm text-gray-600">{user.interests}</p>
          </div>
        </motion.div>
      ) : (
        <div
          className={`${classNames} ${
            user.name.length % 2 === 0 ? "rotate-6" : "-rotate-6"
          }`}
        >
          <div className="relative w-full h-2/3 flex justify-center items-center">
            {loading && <CircularProgress />}
            <img
              src={user.profile_picture_url}
              alt={user.name}
              className="absolute w-full h-full object-cover"
              onLoad={handleImageLoad}
              draggable={false}
            />
          </div>
          <div className="p-4 overflow-y-auto">
            <Title title={user.name} color={"#000"} />
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.gender}</p>
            <p className="text-sm text-gray-600">{user.location}</p>
            <p className="text-sm text-gray-600">{user.university}</p>
            <p className="text-sm text-gray-600">{user.interests}</p>
          </div>
        </div>
      )}
    </>
  );
};

const Title: React.FC<{ title: string; color: string }> = ({
  title,
  color,
}) => {
  return (
    <span style={{ color }} className="text-2xl font-bold">
      {title}
    </span>
  );
};

export default Card;
