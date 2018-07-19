import { Context, getUserId } from "../utils"

export default {
  me: (parent, args, ctx: Context, info) => {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
  recipes: async (parent, args, ctx: Context, info) => {
    return ctx.db.query.recipes({
      where: args.where
    })
  },
  allrecipes: async (parent, args, ctx: Context, info) => {
    return ctx.db.query.recipes({})
  },
  ingredients: async (parent, args, ctx: Context, info) => {
    return ctx.db.query.ingredients({ ...args }, info)
  },
  likedrecipes: (parent, args, ctx: Context, info) => {
    const id = getUserId(ctx)
    return ctx.db.query.recipes(
      { where: { likes_every: { author: { id: id } } } },
      info
    )
  }
}
