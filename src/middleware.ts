import { withAuth } from "next-auth/middleware";

const rolesObj = {
  "/admin": ["ADMIN"],
};

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        console.log(req.nextUrl);
        console.log(Object.keys(rolesObj));
        console.log(["/admin"]);
        return Object.keys(rolesObj).map((key) => {
          // use simple startsWith check, we can move to regex if needed but that'd probably be bad path design
          if (req.nextUrl.pathname.startsWith(key)) {
            // found a match, return if role matches
            return rolesObj[key as keyof typeof rolesObj].includes(token?.role as string || "UNAUTHORIZED");
          }
        }).reduce((prev, cur) => prev || cur) || false;

        console.log("baaaaaaka");
        return false;
      },
    },
  }
);

export const config = { matcher: ["/admin"] };
