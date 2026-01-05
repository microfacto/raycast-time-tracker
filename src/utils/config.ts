import path from "path";
import os from "os";
import { existsSync, readdirSync } from "fs";

/**
 * Configuration centralisée pour l'extension Time Tracker
 */

// Nom du dossier et fichier de données
export const DATA_FOLDER = "TimeTrack";
export const DATA_FILE = "data.json";

// Couleurs par défaut pour les nouveaux projets
export const DEFAULT_PROJECT_COLORS = [
  "#EF4444", // Red
  "#F97316", // Orange
  "#EAB308", // Yellow
  "#22C55E", // Green
  "#3B82F6", // Blue (default)
  "#8B5CF6", // Purple
  "#EC4899", // Pink
] as const;

export const DEFAULT_COLOR = "#3B82F6"; // Blue

// Formats de durée acceptés (pour la documentation)
export const DURATION_FORMATS = {
  decimal: "2.5 (heures décimales)",
  hoursMinutes: "2h30 (heures et minutes)",
  colon: "2:30 (format horloge)",
  minutes: "30m (minutes uniquement)",
  hours: "2h (heures uniquement)",
} as const;

/**
 * Trouve automatiquement le chemin Google Drive
 * Supporte les nouvelles (CloudStorage) et anciennes versions
 */
export function getGoogleDrivePath(): string {
  const homeDir = os.homedir();

  // 1. Nouveau chemin Google Drive (macOS 12+ avec CloudStorage)
  const cloudStoragePath = path.join(homeDir, "Library", "CloudStorage");
  if (existsSync(cloudStoragePath)) {
    try {
      const entries = readdirSync(cloudStoragePath);
      const googleDriveFolder = entries.find((entry) => entry.startsWith("GoogleDrive-"));
      if (googleDriveFolder) {
        return path.join(cloudStoragePath, googleDriveFolder, "My Drive");
      }
    } catch {
      // Continue to fallback
    }
  }

  // 2. Anciens chemins Google Drive
  const legacyPaths = [
    path.join(homeDir, "Google Drive", "My Drive"),
    path.join(homeDir, "Google Drive"),
    path.join(homeDir, "GoogleDrive"),
  ];

  for (const legacyPath of legacyPaths) {
    if (existsSync(legacyPath)) {
      return legacyPath;
    }
  }

  // 3. Fallback par défaut (sera créé s'il n'existe pas)
  return path.join(homeDir, "Google Drive");
}

/**
 * Retourne le chemin complet du fichier de données
 */
export function getDataFilePath(): string {
  const googleDrivePath = getGoogleDrivePath();
  return path.join(googleDrivePath, DATA_FOLDER, DATA_FILE);
}

/**
 * Configuration pour l'affichage
 */
export const UI_CONFIG = {
  // Nombre maximum d'entrées affichées par défaut
  maxEntriesPerPage: 50,

  // Format d'affichage des dates
  dateFormat: "MMM dd, yyyy",

  // Format d'affichage des dates courtes
  dateFormatShort: "MMM dd",

  // Jour de début de semaine (1 = Lundi, 0 = Dimanche)
  weekStartsOn: 1,

  // Toast duration (ms)
  toastDuration: 2000,
} as const;

/**
 * Permet de surcharger le chemin de données via variable d'environnement
 * Utile pour les tests ou configurations personnalisées
 */
export function getCustomDataPath(): string | undefined {
  return process.env.TIMETRACK_DATA_PATH;
}

/**
 * Retourne le chemin final en tenant compte des surcharges
 */
export function getFinalDataPath(): string {
  return getCustomDataPath() || getDataFilePath();
}
