import { FormEvent } from "react";

type Inputs = {
  example: string;
  exampleRequired: string;
  example2: string;
};

function getObjectFromForm<T>(form: HTMLFormElement) {
  return Object.fromEntries(new FormData(form)) as T;
}

export default function Form() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = getObjectFromForm<Inputs>(e.currentTarget);

    console.log("onSubmit", data);
  };

  const handleOnChange = (e: FormEvent<HTMLFormElement>) => {
    const data = getObjectFromForm<Inputs>(e.currentTarget);

    console.log("onChange", data.example);
  };

  return (
    <form
      style={{ color: "black" }}
      className="grid gap-8 w-[80px]"
      onChange={handleOnChange}
      onSubmit={onSubmit}
    >
      <input name="example" />
      <input name="example2" />
      <input name="exampleRequired" />
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      <button style={{ color: "white" }} type="submit">
        제출
      </button>
    </form>
  );
}
