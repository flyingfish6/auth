// "use client";
// import React, { useState } from "react";
// import AuthButton from "./AuthButton";
// import { loginWithCreds } from "@/actions/auth";

// const LoginForm = () => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<string | null>(null); // 错误信息

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       loginWithCreds({ email, password });
//     } catch (error) {}
//   };
//   return (
//     <div>
//       <form action={handleSubmit} className="w-full flex flex-col gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-200">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="Email"
//             id="Email"
//             name="email"
//             className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-200">
//             Password
//           </label>
//           <input
//             type="password"
//             placeholder="Password"
//             name="password"
//             id="password"
//             className="mt-1 w-full px-4 p-2  h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
//           />
//         </div>
//         <div className="mt-4">
//           <AuthButton />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { loginWithCreds } from "@/actions/auth";

interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // 错误信息

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 防止默认表单提交
    setError(null); // 清除之前的错误信息

    // 创建 FormData 实例
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = await loginWithCreds(formData);
    console.log(result);
    if (result?.error) {
      alert("密码错误");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 更新 email 状态
            className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 更新 password 状态
            className="mt-1 w-full px-4 p-2 h-10 rounded-md border border-gray-200 bg-white text-sm text-gray-700"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>} {/* 显示错误信息 */}
        <div className="mt-4">
          <AuthButton />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
