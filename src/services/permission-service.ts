import { Action, Resource, Role } from "@/types/permissions";
import { User } from "@supabase/supabase-js";

export class PermissionService {
  private rolePermissions: Record<Role, Record<Resource, Set<Action>>> = {
    ADMIN: {
      order: new Set(["create", "read", "update", "delete"]),
      product: new Set(["create", "read", "update", "delete"]),
    },
    CUSTOMER: {
      order: new Set(["read", "update"]),
      product: new Set(["read"]),
    },
  };
  private role: Role;
  private userId: User["id"];

  constructor(role: Role, userId: User["id"]) {
    this.role = role;
    this.userId = userId;
  }

  hasPermission(
    resource: Resource,
    action: Action,
    resourceOwnerId?: string | undefined
  ): boolean {
    const hasActionPermission =
      this.rolePermissions[this.role]?.[resource]?.has(action);

    if (!hasActionPermission) {
      return false;
    }

    if (resourceOwnerId && resourceOwnerId !== this.userId) {
      return false;
    }

    return true;
  }
}
