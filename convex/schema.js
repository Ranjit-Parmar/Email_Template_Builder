import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    users: defineTable({
        name : v.string(),
        email : v.string(),
        profile : v.string(),
    }),

    emailTemplates: defineTable({
        templateId : v.string(),
        template : v.any(),
        email : v.string()
    }),

    shared_templates: defineTable({
        to: v.string(),
        subject: v.string(),
        html: v.string(),
        templateId: v.string(),
        user: v.string(),
        createdAt: v.string(),
    }),
})