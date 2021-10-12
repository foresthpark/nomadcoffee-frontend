import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: white;
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;
