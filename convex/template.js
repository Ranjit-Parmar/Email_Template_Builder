import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const SaveTemplate = mutation({
  args: {
    templateId: v.string(),
    template: v.any(),
    email: v.string(),
  },

  handler: async (ctx, args) => {
    try {

      const existing = await ctx.db
        .query("emailTemplates")
        .filter((q) =>
          q.and(
            q.eq(q.field("templateId"), args.templateId),
            q.eq(q.field("email"), args.email)
          )
        )
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, {
          template: args.template,
        });
        return { updated: true, id: existing._id };
      }

      const newId = await ctx.db.insert("emailTemplates", {
        templateId: args.templateId,
        template: args.template,
        email: args.email,
      });

      return { inserted: true, id: newId };
    } catch (error) {
      console.error("Error saving template:", error);
      return { error: "Failed to save template" };
    }
  },
});


export const getEmailTemplate = query({
  args: {
    email : v.string(),
    templateId : v.string()
  },

  handler: async(ctx,args) => {
  try {
    const result = await ctx.db.query('emailTemplates').filter((q)=>q.and(q.eq(q.field('templateId'),args.templateId),
    q.eq(q.field('email'), args.email))).collect();
  
    return result[0];
  } catch (error) {
      return {}
  }
  }
})

export const getUserEmailTemplates = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db
        .query('emailTemplates')
        .filter((q)=>q.eq(q.field('email'),args.email))
        .collect();
        
      return result; // returns an array
    } catch (error) {
      console.error("Error fetching email templates:", error);
      return []; // maintain return type consistency
    }
  },
});
