import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import Input from "../components/auth/Input";
import FormError from "../components/auth/FormError";
import Button from "../components/auth/Button";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../api/login";
import { logUserIn } from "../src/apollo";
import { useRouter } from "next/router";
import {
  Container,
  WhiteBox,
  TopBox,
  BottomBox,
  Wrapper,
  Separator,
  Notification,
  FacebookLogin,
} from "../components/login/styles";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const [login, { data, error, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const {
        login: { ok, error, token },
      } = data;
      if (!ok) {
        setError("result", {
          message: error,
        });
      }

      if (token) {
        logUserIn();
      }
    },
  });

  const onSubmitValid = (data) => {
    if (loading) return;
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <Container>
      <PageTitle title={"Log In"} />
      <Wrapper>
        <TopBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <Notification>{router.query?.message}</Notification>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <Input
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
              })}
              onKeyDown={clearLoginError}
              name="username"
              hasError={!!formState?.errors?.username?.message}
              type="text"
              placeholder="Username"
            />
            {formState.errors?.username?.message && (
              <FormError message={formState?.errors?.username?.message} />
            )}
            <Input
              {...register("password", {
                required: "Password is required",
              })}
              onKeyDown={() => clearErrors("result")}
              name="password"
              type="password"
              placeholder="Password"
              hasError={!!formState.errors?.password?.message}
            />
            {formState.errors?.password?.message && (
              <FormError message={formState.errors?.password?.message} />
            )}
            <Button
              type="submit"
              value="Log in"
              disabled={!formState.isValid}
            />
            {formState.errors?.result?.message && (
              <FormError message={formState.errors?.result?.message} />
            )}
          </form>
          <Separator>
            <div></div>
            <span>Or</span>
            <div></div>
          </Separator>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Log in with Facebook</span>
          </FacebookLogin>
        </TopBox>
        <BottomBox>
          <span>Don't have an account?</span>{" "}
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </BottomBox>
      </Wrapper>
    </Container>
  );
}
