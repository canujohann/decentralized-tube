import React, { useEffect, useState } from "react";
import { useApolloClient, gql } from "@apollo/client";
import { Video } from "../../components/Video";
import { Header } from "../../components/Header";
import { Layout } from "../../components/Layout";

export default function Main() {
  // Creating a state to store the uploaded video
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");

  // Get the client from the useApolloClient hook
  const client = useApolloClient();

  // Query the videos from the the graph
  const GET_VIDEOS = gql`
    query videos(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: Video_filter
    ) {
      videos(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: $where
      ) {
        id
        hash
        title
        description
        location
        category
        thumbnailHash

        date
        author
        createdAt
      }
    }
  `;

  const getVideos = async () => {
    // Query the videos from the graph
    client
      .query({
        query: GET_VIDEOS,
        variables: {
          first: 200,
          skip: 0,
          orderBy: "createdAt",
          orderDirection: "desc",
          where: {
            ...(search && {
              title_contains_nocase: search,
            }),
          },
        },
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        setVideos(data.videos);
      })
      .catch((err) => {
        alert("Something went wrong. please try again.!", err.message);
        alert(err);
      });
  };

  useEffect(() => {
    getVideos();
  }, [search]);
  return (
    <Layout
      search={(e) => {
        setSearch(e);
      }}
    >
      <div className="flex flex-row flex-wrap">
        {videos.map((video) => (
          <div
            key={video.id}
            className="w-80"
            onClick={() => {
              // Navigation to the video screen (which we will create later)
              window.location.href = `/video?id=${video.id}`;
            }}
          >
            <Video video={(true, video)} />
          </div>
        ))}
      </div>
    </Layout>
  );
}
