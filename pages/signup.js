import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { FatLink } from "../components/shared";
import { routes } from "../src/routes";
import Head from "next/head";
import PageTitle from "../components/PageTitle";
import { CREATE_ACCOUNT_MUTATION } from "../api/createAccount";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

export default function SignUp() {
  const router = useRouter();

  const { register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    const { username, password } = getValues();
    router.push(routes.home, {
      query: {
        message: "Account created. Please log in",
        username,
        password,
      },
    });
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    const { username, password, email, name } = data;
    if (loading) return;

    createAccount({
      variables: {
        username,
        name,
        email,
        password,
        // location: data.location || "",
        // githubUserName: data.githubUserName || "",
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "Username is required.",
            })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("email", {
              required: "Email is required.",
            })}
            name="email"
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("name", {
              required: "Name is required.",
            })}
            name="name"
            type="text"
            placeholder="Name"
          />
          <Input
            {...register("password", {
              required: "Password is required.",
            })}
            name="password"
            type="password"
            placeholder="Password"
          />
          {/* <Input
            {...register("location")}
            type="text"
            placeholder="Location"
            name="location"
          />
          <Input
            {...register("githubUserName")}
            type="text"
            placeholder="Github Username"
            name="githubUserName"
          /> */}
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}
