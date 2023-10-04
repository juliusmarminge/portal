import { Role } from "@prisma/client";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "./trpc";

export const eventsRouter = router({
  checkin: protectedProcedure
    .input(
      z.object({
        qrcode: z.number(),
        eventName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (
        !(
          ctx.session.user.role.includes(Role.ADMIN) ||
          ctx.session.user.role.includes(Role.EVENT_MANAGER)
        )
      ) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const user = await ctx.prisma.user.findFirst({
        where: { qrcode: input.qrcode },
      });

      if (user === null || user === undefined) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      const currentTime = new Date();
      await ctx.prisma.eventLog.create({
        data: {
          userId: user.id,
          timestamp: currentTime,
          event: input.eventName,
        },
      });
    }),
});
