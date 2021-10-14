import styled from "styled-components";
import { FatText } from "../shared";

export const Border = styled.div`
  width: 620px;
  height: 1px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;
export const ShopContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 620px;
  padding-bottom: 20px;
`;

export const Username = styled(FatText)`
  margin-left: 5px;
`;

export const PhotoFile = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 15px;
`;

export const ShopData = styled.div`
  width: 315px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  div:nth-child(2) {
    padding-bottom: 5px;
  }
`;

export const ShopHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
`;

export const ShopTitle = styled(FatText)`
  font-size: 20px;
  font-style: italic;
  padding: 5px 15px;
`;

export const ShopCategories = styled.div`
  font-size: 12px;
  padding: 1px 15px;
  opacity: 0.8;
`;

export const ShopAddress = styled.div`
  padding: 5px 15px;
`;

export const ShopRank = styled.span`
  padding: 0 5px 0 10px;
  color: tomato;
`;
export const ShopRankText = styled.span`
  font-weight: 600;
`;
export const ShopRankComment = styled.span`
  opacity: 0.8;
  font-size: 12px;
  margin-left: 5px;
`;
