import { useRouter } from "next/dist/client/router";
import React from "react";
import { useForm } from "react-hook-form";
import AuthLayout from "../../components/auth/AuthLayout";
import FormBox from "../../components/auth/FormBox";
import Input from "../../components/auth/Input";
import PageTitle from "../../components/PageTitle";
import FormError from "../../components/auth/FormError";
import Button from "../../components/auth/Button";
import { EDIT_COFFEESHOP } from "../../api/editCoffeeShop";
import { SEE_COFFEESHOP } from "../../api/seeCoffeeShop";
import { useMutation, useQuery } from "@apollo/client";

export default function EditShop() {
  const router = useRouter();
  const { id } = router.query;

  const onCompleted = (data) => {
    const {
      editCoffeeShop: { ok },
    } = data;
    if (!ok) {
      console.log(data);
      return;
    }
    router.push("/");
  };

  const { data: coffeeShopData, loading: coffeeShopLoading } = useQuery(
    SEE_COFFEESHOP,
    {
      variables: { id },
    }
  );
  console.log(
    "🚀 ~ file: [id].js ~ line 30 ~ EditShop ~ coffeeShopData",
    coffeeShopData
  );

  const [editCoffeeShop, { loading }] = useMutation(EDIT_COFFEESHOP, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm({
    mode: "onChange",
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    editCoffeeShop({
      variables: {
        id,
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        categories: data.category,
        photos: photoFile,
      },
    });
  };

  if (coffeeShopLoading) return <div>Loading...</div>;

  return (
    <AuthLayout>
      <PageTitle title="Edit Shop" />
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
            name="categories"
            type="text"
            placeholder="Categories || ex) Java, CoffeeScript, Ruby, C#"
          />
          <FormError message={errors?.category?.message} />
          {/* <Input
            ref={register}
            type="file"
            name="photos"
            onChange={onPhotoChange}
            multiple
            accept="image/*"
          />
          {isUploaded ? <Img src={preview} alt="preview" /> : null} */}
          <Button
            type="submit"
            value={loading ? "loading..." : "Edit Shop"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
    </AuthLayout>
  );
}
