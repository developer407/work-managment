import React from "react";
import ArchiveIcon from "@mui/icons-material/Archive";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BuildIcon from "@mui/icons-material/Build";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="pb-10">
      <section>
        <img
        className="w-full object-cover object-top h-[60vh]"
          src="https://cdn.pixabay.com/photo/2017/01/06/16/01/world-map-1958131_640.jpg"
          alt=""
        />
      </section>
      <section className="flex justify-center mt-20">
        <div className="px-5 flex justify-between w-full lg:max-w-xl ">
          <div onClick={() => navigate("/tool")} className="cursor-pointer">
            <BuildIcon sx={{ fontSize: "8rem", color: "gray" }} />
            <p className="text-2xl text-center font-semibold">Tool</p>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div
            className="cursor-pointer"
            onClick={() => navigate("/resources")}
          >
            <TravelExploreIcon sx={{ fontSize: "8rem", color: "gray" }} />
            <p className="text-2xl text-center font-semibold">Resource</p>
          </div>
          <Divider orientation="vertical" variant="middle" flexItem />
          <div className="cursor-pointer" onClick={() => navigate("/archive")}>
            <ArchiveIcon sx={{ fontSize: "8rem", color: "gray" }} />
            <p className="text-2xl text-center font-semibold">Archive</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
