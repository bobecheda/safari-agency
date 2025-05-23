from rest_framework import permissions

class IsCustomer(permissions.BasePermission):
    """Custom permission to only allow customers to access certain views."""
    def has_permission(self, request, view):
        # Allow read-only access for any authenticated user
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated
        # Write permissions only for customers
        return request.user.is_authenticated and not (request.user.is_sacco_admin or request.user.is_driver)

class IsSaccoAdmin(permissions.BasePermission):
    """Custom permission to only allow sacco admins to access certain views."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_sacco_admin

    def has_object_permission(self, request, view, obj):
        # Allow sacco admin to modify only their own sacco's data
        if hasattr(obj, 'sacco'):
            return obj.sacco.adminprofile.user == request.user
        return False

class IsOwnerOrReadOnly(permissions.BasePermission):
    """Custom permission to only allow owners of an object to edit it."""
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner.
        if hasattr(obj, 'customer'):
            return obj.customer == request.user
        elif hasattr(obj, 'passenger'):
            return obj.passenger == request.user
        return False