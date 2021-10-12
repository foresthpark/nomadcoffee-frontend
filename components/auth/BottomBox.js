import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import { BaseBox } from "../shared";

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;

export default function BottomBox({ cta, link, linkText }) {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link href={link}>
        <a>{linkText}</a>
      </Link>
    </SBottomBox>
  );
}

BottomBox.propTypes = {
  cta: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};
