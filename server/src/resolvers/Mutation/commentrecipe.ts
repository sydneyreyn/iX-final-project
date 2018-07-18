import { Context, getUserId } from "../../utils"
export default {
  commentRecipe: async (parent, args, ctx: Context, info) => {
    return await ctx.db.mutation.updateRecipe(
      {
        data: {
          comment: args.text,
          author: {
            connect: {
              id: id
            }
          }
        }
      },
      info
    )
  }
}