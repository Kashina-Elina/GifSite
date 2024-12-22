import React from "react";
import { Grid } from "@giphy/react-components";

const ShowGif = ({
  fetchGifs,
  handleGifSelect,
  isOpen,
}: {
  fetchGifs: any;
  handleGifSelect: any;
  isOpen: any;
}) => {
  return (
    isOpen && (
      <div className="absolute overflow-hidden">
        <Grid
          hideAttribution={true}
          width={393}
          columns={3}
          fetchGifs={fetchGifs}
          onGifClick={(gif, e) => {
            e.preventDefault();
            handleGifSelect(gif.images.fixed_height.url);
          }}
          className="bg-white"
        />
      </div>
    )
  );
};

export default ShowGif;
