import { useRouter } from "next/dist/client/router";
import React from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError";
import Button from "../components/auth/Button";
import { useMutation } from "@apollo/client";
import { CREATE_COFFEESHOP } from "../api/createCoffeeShop";

export default function AddCoffeeShop() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      createCoffeeShop: { ok },
    } = data;
    if (!ok) {
      console.log(data);
      return;
    }
    router.push("/");
  };

  const [createCoffeeShopMutation, { loading }] = useMutation(
    CREATE_COFFEESHOP,
    { onCompleted }
  );

  // const [preview, setPreview] = useState(null);
  // const isUploaded = useReactiveVar(uploadVar);

  let photoFile;

  // const onPhotoChange = (e) => {
  //   const {
  //     target: {
  //       files: [file],
  //     },
  //   } = e;
  //   photoFile = file;
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setPreview(reader.result);
  //     uploadVar(true);
  //   };
  // };

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    createCoffeeShopMutation({
      variables: {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        categories: data.category,
        photos: photoFile,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Create Shop" />
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("name", {
              required: "name is required",
            })}
            name="name"
            type="text"
            placeholder="Shop Name"
          />
          <FormError message={errors?.name?.message} />
          <Input
            {...register("latitude", {
              required: "Latitude is required",
            })}
            name="latitude"
            type="text"
            placeholder="Latitude"
          />
          <FormError message={errors?.latitude?.message} />
          <Input
            {...register("longitude", {
              required: "Longitude is required",
            })}
            name="longitude"
            type="text"
            placeholder="Longitude"
          />
          <FormError message={errors?.longitude?.message} />
          <Input
            {...register}
            name="category"
            type="text"
            placeholder="Category"
          />
          <FormError message={errors?.category?.message} />
          {/* <Input
            {...register}
            type="file"
            name="photos"
            onChange={onPhotoChange}
            multiple
            accept="image/*"
          /> */}
          {/* {isUploaded ? <Img src={preview} alt="preview" /> : null} */}
          <Button
            type="submit"
            value={loading ? "loading..." : "Create Shop"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
    </AuthLayout>
  );
}
