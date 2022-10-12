import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const SignUp: NextPage = () => {
  const [dark, setDark] = useState<boolean>(true);

  return (
    <>
      <Head>
        <title>DH9 Sign Up Page</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`flex min-h-screen ${dark && "dark"}`}
        data-theme={dark ? "dark" : "light"}
      >
        <div className="relative flex-1 overflow-hidden bg-[#171717]">
          <div
            className="absolute inset-0 -top-[50%] -left-[50%] h-[200%] w-[200%] -rotate-12 animate-slow-bg"
            style={{
              maskImage: "url(images/bg.png)",
              WebkitMaskImage: "url(images/bg.png)",
              background:
                "linear-gradient(#1C1C1C 0%, #1C1C1C 40%, #2e2e2e 50%, #1C1C1C 60%, #1C1C1C 100%)",
              backgroundSize: "200% 200%",
            }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Image
              draggable="false"
              src="/images/leftp.png"
              alt="deltahacks 9 logo"
              width={700}
              height={200}
            />
          </div>
        </div>
        <div className="relative flex-1 bg-white dark:bg-[#1F1F1F]">
          <div className="relative flex w-full justify-between p-4 pl-8">
            <button
              type="button"
              onClick={() => (dark ? setDark(false) : setDark(true))}
            >
              <Image
                src={dark ? "/images/bxs_moon.svg" : "/images/bxs_sun.svg"}
                alt=""
                width={24}
                height={24}
              />
            </button>
            <nav className="flex items-center justify-end gap-8">
              <a
                href="https://deltahacks.com"
                className="text-black dark:text-white"
              >
                Home{" "}
              </a>
              <Link href={"/Login"}>
                <button className="btn btn-primary rounded-lg bg-indigo-600 py-3 px-4 text-sm normal-case text-white hover:bg-indigo-700">
                  Log In
                </button>
              </Link>
            </nav>
          </div>
          <div className="absolute left-1/2 top-1/2 mt-6 w-full -translate-x-1/2 -translate-y-1/2 px-8 md:px-20 lg:w-72 lg:p-0">
            <h2 className="mb-4 font-inter text-2xl font-bold text-black dark:text-white">
              Sign Up
            </h2>
            <form className="form-control w-full">
              <label className="label">
                <span className="label-text text-sm text-black dark:text-white">
                  First Name
                </span>
              </label>
              <input
                type="email"
                placeholder="First Name"
                className="input input-bordered my-2 w-full rounded-lg p-4 text-xs text-black dark:bg-zinc-800 dark:text-white"
              />
              <label className="label">
                <span className="label-text text-sm text-black dark:text-white">
                  Last Name
                </span>
              </label>
              <input
                type="email"
                placeholder="Last Name"
                className="input input-bordered my-2 w-full rounded-lg p-4 text-xs text-black dark:bg-zinc-800 dark:text-white"
              />
              <label className="label">
                <span className="label-text text-sm text-black dark:text-white">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered my-2 w-full rounded-lg p-4 text-xs text-black dark:bg-zinc-800 dark:text-white"
              />
              <label className="label">
                <span className="label-text-alt text-sm text-black dark:text-white">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered mt-2 w-full rounded-lg p-4 text-xs text-black dark:bg-zinc-800 dark:text-white"
              />
              <button className="btn btn-primary mt-6 w-full rounded-lg bg-indigo-600 py-4 text-sm normal-case text-white hover:bg-indigo-700">
                Sign Up
              </button>
              <div className="mt-2 font-inter text-sm font-normal text-black dark:text-white">
                Already have an account?{" "}
                <Link href={"/Login"}>
                  <a href="">
                    <strong>Log In</strong>
                  </a>
                </Link>{" "}
                here
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
