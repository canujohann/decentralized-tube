import React, { useState, useRef } from "react";
import { BiCloud, BiMusic, BiPlus } from "react-icons/bi";
import Image from "next/image";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { videoCategories } from "../../utils/utils";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";

import getContract from "../../utils/getContract";

export default function Upload() {
  // Creating state for the input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [video, setVideo] = useState("");

  //  Creating a ref for thumbnail and video
  const thumbnailRef = useRef();
  const videoRef = useRef();

  const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  const client = ipfsHttpClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    apiPath: "/api/v0",
    headers: {
      authorization: auth,
    },
  });

  // When user clicks on the upload button
  const handleSubmit = async () => {
    // Checking if user has filled all the fields
    if (
      title === "" ||
      description === "" ||
      category === "" ||
      location === "" ||
      thumbnail === "" ||
      video === ""
    ) {
      // If user has not filled all the fields, throw an error
      alert("Please fill all the mandatory fields");
      return;
    }
    // If user has filled all the fields, upload the thumbnail to IPFS
    uploadThumbnail(thumbnail);
  };

  const uploadThumbnail = async (thumbnail) => {
    try {
      // Uploading the thumbnail to IPFS
      const added = await client.add(thumbnail);
      uploadVideo(added.path);
    } catch (error) {
      console.log("Error uploading thumbnail file: ", error);
    }
  };

  const uploadVideo = async (thumbnail) => {
    try {
      // Uploading the video to IPFS
      const added = await client.add(video);
      await saveVideo(added.path, thumbnail);
    } catch (error) {
      console.log("Error uploading video file: ", error);
    }
  };

  const saveVideo = async (video, thumbnail) => {
    // Get the contract from the getContract function
    let contract = await getContract();
    // Get todays date
    let UploadedDate = String(new Date());
    // Upload the video to the contract
    await contract.uploadVideo(
      video,
      title,
      description,
      location,
      category,
      thumbnail,
      UploadedDate
    );
  };

  return (
    <Layout
      searchHidden={true}
      search={(e) => {
        setSearch(e);
      }}
    >
      <div className="mt-5 mr-10 flex  justify-end">
        <div className="flex items-center">
          <button className="bg-transparent  text-[#9CA3AF] py-2 px-6 border rounded-lg  border-gray-600  mr-6">
            Discard
          </button>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2  rounded-lg flex px-4 justify-between flex-row items-center"
          >
            <BiCloud />
            <p className="ml-2">Upload</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col m-10     mt-5  lg:flex-row">
        <div className="flex lg:w-3/4 flex-col ">
          <label className="text-[#9CA3AF]  text-sm">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Rick Astley - Never Gonna Give You Up (Official Music Video)"
            className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
          />
          <label className="text-[#9CA3AF] mt-10">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Never Gonna Give You Up was a global smash on its release in July 1987, topping the charts in 25 countries including Rick???s native UK and the US Billboard Hot 100.  It also won the Brit Award for Best single in 1988. Stock Aitken and Waterman wrote and produced the track which was the lead-off single and lead track from Rick???s debut LP ???Whenever You Need Somebody."
            className="w-[90%] text-white h-32 placeholder:text-gray-600  rounded-md mt-2 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
          />

          <div className="flex flex-row mt-10 w-[90%]  justify-between">
            <div className="flex flex-col w-2/5    ">
              <label className="text-[#9CA3AF]  text-sm">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                placeholder="Bali - Indonesia"
                className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
              />
            </div>
            <div className="flex flex-col w-2/5    ">
              <label className="text-[#9CA3AF]  text-sm">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-[90%] text-white placeholder:text-gray-600  rounded-md mt-2 h-12 p-2 border  bg-[#1a1c1f] border-[#444752] focus:outline-none"
              >
                {videoCategories.map((item, index) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
            </div>
          </div>
          <label className="text-[#9CA3AF]  mt-10 text-sm">Thumbnail</label>

          <div
            onClick={() => {
              thumbnailRef.current.click();
            }}
            className="border-2 w-64 border-gray-600  border-dashed rounded-md mt-2 p-2  h-36 items-center justify-center flex"
          >
            {thumbnail ? (
              <Image
                onClick={() => {
                  thumbnailRef.current.click();
                }}
                src={URL.createObjectURL(thumbnail)}
                alt="thumbnail"
                className="h-full rounded-md"
                width={250}
                height={250}
              />
            ) : (
              <BiPlus size={40} color="gray" />
            )}
          </div>

          <input
            type="file"
            className="hidden"
            ref={thumbnailRef}
            onChange={(e) => {
              setThumbnail(e.target.files[0]);
            }}
          />
        </div>

        <div
          onClick={() => {
            videoRef.current.click();
          }}
          className={
            video
              ? " w-96   rounded-md  h-64 items-center justify-center flex"
              : "border-2 border-gray-600  w-96 border-dashed rounded-md mt-8   h-64 items-center justify-center flex"
          }
        >
          {video ? (
            <video
              controls
              src={URL.createObjectURL(video)}
              className="h-full rounded-md"
            />
          ) : (
            <p className="text-[#9CA3AF]">Upload Video</p>
          )}
        </div>
      </div>
      <input
        type="file"
        className="hidden"
        ref={videoRef}
        accept={"video/*"}
        onChange={(e) => {
          setVideo(e.target.files[0]);
          console.log(e.target.files[0]);
        }}
      />
    </Layout>
  );
}
