import InputGroup from "@/components/react-hook-form/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .email("이메일 형식을 입력해주세요."),
    userId: z
      .string()
      .min(1, "아이디를 입력해주세요.")
      .regex(
        /^[a-z0-9]{4,30}$/,
        "영문 소문자 또는 영문+숫자 조합 4~30자리를 입력해주세요."
      ),
    password: z
      .string()
      .min(1, "비밀번호를 입력해주세요.")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        "영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요."
      ),
    passwordCheck: z.string().min(1, "비밀번호를 다시 입력해주세요."),
    recommendationCode: z
      .string()
      .regex(/^[a-z]{0,}$/, "추천코드는 소문자로 입력 가능합니다")
      .optional(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호가 일치하지 않습니다.",
  });

type Inputs = {
  email: string;
  userId: string;
  password: string;
  passwordCheck: string;
  recommendationCode: string;
  agree: string;
};

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(registerSchema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const buttonDisabled =
    !!errors.agree ||
    !!errors.email ||
    !!errors.password ||
    !!errors.passwordCheck ||
    !!errors.recommendationCode ||
    !!errors.root ||
    !!errors.userId;

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <InputGroup
        id="email"
        label="이메일"
        placeholder="@이하 주소까지 모두 입력"
        errorMessage={errors.email?.message}
        {...register("email")}
      />

      <InputGroup
        id="userId"
        label="아이디"
        placeholder="영문 소문자 또는 영문+숫자 조합 4~30자리"
        errorMessage={errors.userId?.message}
        {...register("userId")}
      />

      <InputGroup
        id="password"
        label="비밀번호"
        type="password"
        placeholder={"영문+숫자+특수문자 조합 8~15자리"}
        errorMessage={errors.password?.message}
        {...register("password")}
      />

      <InputGroup
        id="passwordCheck"
        label="비밀번호 확인"
        type="password"
        placeholder={"비밀번호 확인"}
        errorMessage={errors.passwordCheck?.message}
        {...register("passwordCheck")}
      />

      <InputGroup
        id="recommendationCode"
        label="추천코드"
        placeholder={"추천코드 입력"}
        errorMessage={errors.recommendationCode?.message}
        required={false}
        {...register("recommendationCode")}
      />
      <button
        className={`w-full bg-[#00CCAA] text-white rounded-[6px] px-4 py-3 ${
          buttonDisabled && "bg-gray-300"
        }`}
        disabled={buttonDisabled}
      >
        제출
      </button>
    </form>
  );
}
