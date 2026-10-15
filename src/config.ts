// src/config.ts
// Single source of truth for the App Store URL.
export const APP_STORE_URL = 'https://apps.apple.com/us/app/tuwa/id6761185505';
export const SUPPORT_EMAIL = 'support@tuwa.app';

// The Tuwa Supabase project, for the MCP connector's OAuth consent page (/oauth/consent).
// The publishable key is the same one the app ships; it is public by design (row-level
// security guards every table). Never put a secret or service-role key here.
export const SUPABASE_URL = 'https://wbqnzblcixlmlwbqmxjp.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_g5xsj1G3vR6RbXgsQ3Siyg_bRyttC_P';
