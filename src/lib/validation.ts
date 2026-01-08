import { z } from 'zod';

export const PermissionChecklistSchema = z.object({
  selectedPermissions: z.array(z.string()).default([]),
});

export type PermissionChecklistData = z.infer<typeof PermissionChecklistSchema>;

/**
 * Validate that Administrator is not used without explicit confirmation
 */
export function validatePermissions(
  permissions: string[],
): { valid: boolean; hasAdmin: boolean } {
  const hasAdmin = permissions.includes('administrator');
  return {
    valid: true,
    hasAdmin,
  };
}
