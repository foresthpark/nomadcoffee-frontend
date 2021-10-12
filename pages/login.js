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

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  width: 100%;
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
    input {
      width: 100%;
      border-radius: 3px;
      padding: 7px;
      background-color: #fafafa;
      border: 0.5px solid rgb(219, 219, 219);
      margin-top: 5px;
      box-sizing: border-box;
      &::placeholder {
        font-size: 12px;
      }
      &:last-child {
        border: none;
        margin-top: 12px;
        background-color: #0095f6;
        color: white;
        text-align: center;
        padding: 8px 0px;
        font-weight: 600;
      }
    }
  }
`;

const BottomBox = styled(WhiteBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    color: #0095f6;
  }
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Separator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    font-size: 12px;
    color: #8e8e8e;
  }
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

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

  const onSubmitInvalid = (data) => {
    //
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
