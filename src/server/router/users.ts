import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./context";

export const userRouter = createProtectedRouter()
  .query("byRole", {
    input: z.object({ role: z.nullable(z.nativeEnum(Role)) }),
    async resolve({ ctx, input }) {
      if (!ctx.session.user.role.includes(Role["ADMIN"])) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      if (input.role === null) {
        return await ctx.prisma?.user.findMany();
      }
      return await ctx.prisma?.user.findMany({
        where: {
          role: {
            has: input.role,
          },
        },
      });
    },
  })
  .mutation("addRole", {
    input: z.object({ id: z.string(), role: z.nativeEnum(Role) }),
    async resolve({ ctx, input }) {
      if (!ctx.session.user.role.includes(Role["ADMIN"])) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const user = await ctx.prisma.user.findFirst({
        where: { id: input.id },
      });

      if (user == null || user == undefined) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      // else update
      await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          role: [...user.role, input.role],
        },
      });
    },
  })
  .mutation("removeRole", {
    input: z.object({ id: z.string(), role: z.nativeEnum(Role) }),
    async resolve({ ctx, input }) {
      if (!ctx.session.user.role.includes(Role["ADMIN"])) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const { role } = (await ctx.prisma?.user.findFirstOrThrow({
        where: { id: input.id },
        select: { role: true },
      })) || { role: undefined };
      await ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          role: {
            set: role?.filter((role: any) => role !== input.role),
          },
        },
      });
    },
  });
