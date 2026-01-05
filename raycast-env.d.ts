/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Data File Path - Custom path for data.json (leave empty to auto-detect: Google Drive, Dropbox, iCloud, or ~/Documents) */
  "dataPath"?: string,
  /** Date Format - How dates are displayed in the interface */
  "dateFormat": "MMM dd, yyyy" | "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy-MM-dd",
  /** Default Project Color - Color for new projects */
  "defaultColor": "#EF4444" | "#F97316" | "#EAB308" | "#22C55E" | "#3B82F6" | "#8B5CF6" | "#EC4899"
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `log-time` command */
  export type LogTime = ExtensionPreferences & {}
  /** Preferences accessible in the `view-entries` command */
  export type ViewEntries = ExtensionPreferences & {}
  /** Preferences accessible in the `manage-projects` command */
  export type ManageProjects = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `log-time` command */
  export type LogTime = {}
  /** Arguments passed to the `view-entries` command */
  export type ViewEntries = {}
  /** Arguments passed to the `manage-projects` command */
  export type ManageProjects = {}
}

