/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

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

