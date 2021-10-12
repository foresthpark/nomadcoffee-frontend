import { PropTypes } from "prop-types";
import Head from "next/head";

export default function PageTitle({ title }) {
  return (
    <Head>
      <title>{title} | Nomad Coffee</title>
    </Head>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
