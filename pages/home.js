import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import { SEE_COFFEESHOPS } from "../api/seeCoffeeShops";
import { darkModeVar, isLoggedInVar, logUserOut } from "../src/apollo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Border,
  ShopContainer,
  Username,
  PhotoFile,
  ShopData,
  ShopHeader,
  ShopTitle,
  ShopCategories,
  ShopAddress,
  ShopRank,
  ShopRankText,
  ShopRankComment,
} from "../components/home/styles";
import PageTitle from "../components/PageTitle";

export default function Home() {
  const { data, loading } = useQuery(SEE_COFFEESHOPS, {
    variables: {
      lastId: 0,
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <PageTitle title={"Nomad Coffee"} />
      {data?.seeCoffeeShops?.map((shop) => (
        <ShopContainer key={shop.id}>
          {/* <PhotoFile src={shop.photos[0]?.url} /> */}
          <ShopData>
            <div>
              <ShopHeader>
                <div>
                  {/* <Link href={`/users/${shop.user.username}`}>
                    <Avatar lg url={shop.user.avatarURL} />
                  </Link> */}
                  <Link href={`/users/${shop.user.username}`}>
                    <a>
                      <Username>{shop.user.username}</Username>
                    </a>
                  </Link>
                </div>
                <div>
                  <FontAwesomeIcon icon={faHeart} size="lg" />
                </div>
              </ShopHeader>
              <ShopTitle>{shop.name}</ShopTitle>
              <ShopCategories>
                {shop.categories?.map((category) => (
                  <span key={category.id}>{category.name}</span>
                ))}
              </ShopCategories>
              <ShopAddress>
                Address: lat: {shop.latitude}, long: {shop.longitude}
              </ShopAddress>
            </div>
            <div>
              {/* <ShopRank>
                <FontAwesomeIcon icon={faStar} />
              </ShopRank>
              <ShopRankText>4.88</ShopRankText>
              <ShopRankComment>(11 comments)</ShopRankComment> */}
            </div>
          </ShopData>
        </ShopContainer>
      ))}
    </div>
  );
}
