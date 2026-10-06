import type { Bond, User } from "../../core/src/models.js";

export class Authenticator {
  verifyUser(user: User): boolean {
    return user.kycStatus === "verified" && !!user.address;
  }

  hasRole(user: User, roles: string[]): boolean {
    return roles.includes(user.role);
  }

  ensureAccess(user: User, requiredRoles: string[]): boolean {
    return this.verifyUser(user) && this.hasRole(user, requiredRoles);
  }
}

export class PermissionService {
  static canIssueBond(user: User): boolean {
    return user.role === "issuer" && user.kycStatus === "verified";
  }

  static canApproveCompliance(user: User): boolean {
    return user.role === "compliance" && user.kycStatus === "verified";
  }
}
