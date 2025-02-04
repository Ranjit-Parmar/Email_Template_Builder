import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    profile: v.string(),
  },
  handler: async (ctx, args) => {
    // Log the args to check incoming data
    console.log(args);

    // Check if the user already exists by email
    const existingUser = await ctx.db.query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .collect();

    if (existingUser.length > 0) {
      // If user already exists, return the first match
      return existingUser[0];
    }

    // Otherwise, insert a new user
    const user = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      profile: args.profile,
    });

    return user;
  }
});
