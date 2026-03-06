<!--
  Snippet: Permissions Matrix — Roles example
  Description: Role-based access control using the generic PermissionsMatrix component
  Components: PermissionsMatrix
-->
<script setup lang="ts">
import { ref } from 'vue'
import { Icons } from '../../shared/model'
import PermissionsMatrix from '../../shared/ui/snippets/PermissionsMatrix.vue'
import type { MatrixRow, MatrixColumn, MatrixGroup, MatrixValue } from '../../shared/ui/snippets/types'

// ─── Rows = Roles ─────────────────────────────────────────────────────────────

const rows: MatrixRow[] = [
  { key: 'super_admin', label: 'Super Admin', subtitle: 'Full system access',      icon: Icons.ShieldCrown,   color: 'error'     },
  { key: 'admin',       label: 'Admin',       subtitle: 'Administrative access',   icon: Icons.ShieldAccount, color: 'deep-orange' },
  { key: 'manager',     label: 'Manager',     subtitle: 'Team management',         icon: Icons.AccountCog,    color: 'primary'   },
  { key: 'editor',      label: 'Editor',      subtitle: 'Content editing',         icon: Icons.Edit,          color: 'success'   },
  { key: 'viewer',      label: 'Viewer',      subtitle: 'Read-only access',        icon: Icons.Eye,           color: 'secondary' },
]

// ─── Column groups = Resources ───────────────────────────────────────────────

const columnGroups: MatrixGroup[] = [
  { key: 'users',     label: 'Users',     color: 'primary', icon: Icons.AccountGroup    },
  { key: 'content',   label: 'Content',   color: 'success', icon: Icons.PackageVariant  },
  { key: 'orders',    label: 'Orders',    color: 'warning', icon: Icons.Cart            },
  { key: 'analytics', label: 'Analytics', color: 'info',    icon: Icons.ChartBar        },
  { key: 'system',    label: 'System',    color: 'error',   icon: Icons.Settings        },
]

// ─── Columns = Permissions ───────────────────────────────────────────────────

const columns: MatrixColumn[] = [
  // Users
  { key: 'users_view',   label: 'View',   shortLabel: 'View',   icon: Icons.Eye,        color: 'info',    group: 'users'     },
  { key: 'users_create', label: 'Create', shortLabel: 'Create', icon: 'mdi-plus-circle', color: 'success', group: 'users'     },
  { key: 'users_edit',   label: 'Edit',   shortLabel: 'Edit',   icon: Icons.Edit,        color: 'warning', group: 'users'     },
  { key: 'users_delete', label: 'Delete', shortLabel: 'Delete', icon: Icons.DeleteOutline, color: 'error', group: 'users'     },

  // Content
  { key: 'content_view',   label: 'View',   shortLabel: 'View',   icon: Icons.Eye,          color: 'info',    group: 'content'   },
  { key: 'content_create', label: 'Create', shortLabel: 'Create', icon: 'mdi-plus-circle',  color: 'success', group: 'content'   },
  { key: 'content_edit',   label: 'Edit',   shortLabel: 'Edit',   icon: Icons.Edit,          color: 'warning', group: 'content'   },
  { key: 'content_delete', label: 'Delete', shortLabel: 'Delete', icon: Icons.DeleteOutline, color: 'error',   group: 'content'   },

  // Orders
  { key: 'orders_view',   label: 'View',   shortLabel: 'View',   icon: Icons.Eye,          color: 'info',    group: 'orders'    },
  { key: 'orders_edit',   label: 'Edit',   shortLabel: 'Edit',   icon: Icons.Edit,          color: 'warning', group: 'orders'    },
  { key: 'orders_export', label: 'Export', shortLabel: 'Export', icon: Icons.Export,        color: 'secondary', group: 'orders'  },

  // Analytics
  { key: 'analytics_view',   label: 'View',   shortLabel: 'View',   icon: Icons.Eye,    color: 'info',      group: 'analytics' },
  { key: 'analytics_export', label: 'Export', shortLabel: 'Export', icon: Icons.Export, color: 'secondary', group: 'analytics' },

  // System
  { key: 'settings_view', label: 'View',   shortLabel: 'View',   icon: Icons.Eye,  color: 'info',    group: 'system' },
  { key: 'settings_edit', label: 'Edit',   shortLabel: 'Edit',   icon: Icons.Edit, color: 'warning', group: 'system' },
  { key: 'billing_view',  label: 'Billing', shortLabel: 'Billing', icon: Icons.CreditCard, color: 'success', group: 'system' },
]

// ─── Initial permissions ──────────────────────────────────────────────────────

const permissions = ref<MatrixValue>({
  super_admin: {
    users_view: true,  users_create: true,  users_edit: true,  users_delete: true,
    content_view: true, content_create: true, content_edit: true, content_delete: true,
    orders_view: true,  orders_edit: true,  orders_export: true,
    analytics_view: true, analytics_export: true,
    settings_view: true, settings_edit: true, billing_view: true,
  },
  admin: {
    users_view: true,  users_create: true,  users_edit: true,  users_delete: false,
    content_view: true, content_create: true, content_edit: true, content_delete: true,
    orders_view: true,  orders_edit: true,  orders_export: true,
    analytics_view: true, analytics_export: true,
    settings_view: true, settings_edit: true, billing_view: true,
  },
  manager: {
    users_view: true,  users_create: false, users_edit: true,  users_delete: false,
    content_view: true, content_create: true, content_edit: true, content_delete: false,
    orders_view: true,  orders_edit: true,  orders_export: true,
    analytics_view: true, analytics_export: false,
    settings_view: true, settings_edit: false, billing_view: false,
  },
  editor: {
    users_view: false, users_create: false, users_edit: false, users_delete: false,
    content_view: true, content_create: true, content_edit: true, content_delete: false,
    orders_view: true,  orders_edit: false, orders_export: false,
    analytics_view: false, analytics_export: false,
    settings_view: false, settings_edit: false, billing_view: false,
  },
  viewer: {
    users_view: false, users_create: false, users_edit: false, users_delete: false,
    content_view: true, content_create: false, content_edit: false, content_delete: false,
    orders_view: true,  orders_edit: false, orders_export: false,
    analytics_view: false, analytics_export: false,
    settings_view: false, settings_edit: false, billing_view: false,
  },
})
</script>

<template>
  <PermissionsMatrix
    v-model="permissions"
    :rows="rows"
    :columns="columns"
    :column-groups="columnGroups"
    :immediate="false"
    row-header-label="Role"
    :elevation="0"
  >
    <!-- Save/Discard in footer -->
    <template #footer="{ hasChanges, save, discard }">
      <template v-if="hasChanges">
        <VDivider />
        <div class="d-flex justify-end gap-2 pa-3">
          <VBtn variant="text" size="small" @click="discard">Discard</VBtn>
          <VBtn color="primary" size="small" variant="flat" :prepend-icon="Icons.ContentSave" @click="save">
            Save changes
          </VBtn>
        </div>
      </template>
    </template>
  </PermissionsMatrix>
</template>
