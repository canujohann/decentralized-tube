import Plyr from "plyr-react";
import "plyr-react/plyr.css";

export const Player = ({ hash }) => {
  let url = `${process.env.NEXT_PUBLIC_INFURA_IPFS_PRIVATE_GATEWAY}/${hash}`;
  return (
    <Plyr
      source={{
        type: "video",
        title: "Example title",
        sources: [
          {
            src: url,
            type: "video/mp4",
          },
        ],
      }}
      options={{
        autoplay: false,
      }}
      autoPlay={false}
    />
  );
};
