import { ConvexHttpClient } from 'convex/browser';
import { api } from '../convex/_generated/api';

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// 👇 Query: Fetch template
export async function fetchEmailTemplate(email, templateId) {
  return await client.query(api.template.getEmailTemplate, { email, templateId });
}

// 👇 Mutation: Record share
export async function recordSharedTemplate(templateId, sharedBy, recipientEmail, message) {
  return await client.mutation(api.template.recordShareTemplate, {
    templateId,
    sharedBy,
    recipientEmail,
    message,
  });
}
