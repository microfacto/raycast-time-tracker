<div align="center">

# ⏱️ Time Tracker

### Simple, powerful manual time tracking for Raycast

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Raycast](https://img.shields.io/badge/Raycast-Extension-red?logo=raycast&logoColor=white)](https://raycast.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Configuration](#-configuration) • [Contributing](#-contributing)

</div>

---

## ✨ Features

- **⚡ Quick Time Logging** - Smart duration parsing supports `2.5`, `2h30`, `2:30`, `30m` formats
- **📊 Entry Management** - Browse, search, filter, and analyze your time entries
- **🎨 Project Organization** - Color-coded projects with archive support
- **☁️ Cloud Sync Ready** - Auto-detects Google Drive, Dropbox, iCloud, or uses local storage
- **🎯 Smart Defaults** - Remembers your last project and pre-fills today's date
- **⌨️ Keyboard First** - Full keyboard navigation with intuitive shortcuts
- **🔒 Privacy Focused** - All data stored locally, no external services
- **🎭 Flexible Storage** - JSON format for easy backup and migration

## 🚀 Installation

### From Raycast Store *(Coming Soon)*

Search for "Time Tracker" in the Raycast Store

### Manual Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/microfacto/raycast-time-tracker.git
   cd raycast-time-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development mode**
   ```bash
   npm run dev
   ```

### Requirements

- [Raycast](https://raycast.com/) (latest version recommended)
- Node.js 20 or higher
- macOS 12 or higher

## 📖 Usage

### Log Time

The fastest way to track your work:

1. Launch Raycast and type **"Log Time"**
2. Select your project *(auto-selects last used)*
3. Enter duration in any format you prefer
4. Pick a date *(defaults to today)*
5. Add an optional comment
6. Press `Enter` ✨

**Duration Format Examples:**
```
2.5     → 2.5 hours
2h30    → 2 hours 30 minutes
2:30    → 2 hours 30 minutes
30m     → 30 minutes
```

### View Entries

Track and analyze your logged time:

- **Filter by period** - Today, This Week, This Month, All Time
- **Search** - Find entries by project name or comment
- **Statistics** - See total hours for any period
- **Actions** - Edit, copy, or delete entries

**Keyboard Shortcuts:**
- `Cmd + C` - Copy entry as text
- `Cmd + E` - Edit entry
- `Ctrl + X` - Delete entry

### Manage Projects

Organize your work:

- **Create** projects with custom colors
- **Edit** project details anytime
- **Archive** inactive projects *(they won't clutter your list)*
- **Delete** projects *(removes all associated entries)*
- **Quick Create** - Press `Cmd + N` anywhere to create a new project

**Keyboard Shortcuts:**
- `Cmd + N` - Create new project
- `Cmd + A` - Archive/unarchive project
- `Ctrl + X` - Delete project

## ⚙️ Configuration

### Storage Location

Time Tracker automatically detects your cloud storage:

**Priority Order:**
1. **Raycast Preference** - Set custom path in extension preferences
2. **Environment Variable** - `TIMETRACK_DATA_PATH`
3. **Auto-detection:**
   - Google Drive (macOS 12+ CloudStorage or legacy paths)
   - Dropbox (`~/Dropbox`)
   - iCloud Drive (`~/Library/Mobile Documents/com~apple~CloudDocs`)
   - Local Documents (`~/Documents`)

### Raycast Preferences

Configure the extension via Raycast Preferences:

| Setting | Description | Default |
|---------|-------------|---------|
| **Data File Path** | Custom path for data.json | *Auto-detected* |
| **Date Format** | Display format for dates | `MMM dd, yyyy` |
| **Default Project Color** | Color for new projects | Blue (`#3B82F6`) |

### Custom Data Path

**Via Environment Variable:**
```bash
export TIMETRACK_DATA_PATH="/path/to/your/data.json"
```

**Via Raycast Preferences:**
1. Open Raycast → Extensions → Time Tracker
2. Click "Configure Extension"
3. Set "Data File Path"

### Date Format Options

- `MMM dd, yyyy` → Jan 05, 2026
- `dd/MM/yyyy` → 05/01/2026
- `MM/dd/yyyy` → 01/05/2026
- `yyyy-MM-dd` → 2026-01-05

## 🗂️ Data Format

Your data is stored in a simple, readable JSON format:

```json
{
  "projects": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Website Redesign",
      "color": "#3B82F6",
      "archived": false,
      "createdAt": "2026-01-05T10:00:00.000Z"
    }
  ],
  "entries": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "projectId": "550e8400-e29b-41d4-a716-446655440000",
      "date": "2026-01-05",
      "duration": 2.5,
      "comment": "Implemented new homepage design",
      "createdAt": "2026-01-05T14:30:00.000Z"
    }
  ]
}
```

## 🛠️ Development

### Tech Stack

- **Runtime:** [Raycast API](https://developers.raycast.com/) 1.65+
- **Language:** TypeScript 5.2
- **Date Handling:** [date-fns](https://date-fns.org/) 4.1
- **Linting:** ESLint 9 with Raycast config
- **Formatting:** Prettier 3

### Project Structure

```
raycast-time-tracker/
├── src/
│   ├── log-time.tsx              # Quick time entry command
│   ├── view-entries.tsx          # Browse and manage entries
│   ├── manage-projects.tsx       # Project management
│   └── utils/
│       ├── config.ts             # Configuration and paths
│       ├── storage.ts            # File operations
│       ├── duration.ts           # Duration parsing
│       └── types.ts              # TypeScript definitions
├── assets/
│   └── command-icon.png          # Extension icon
├── scripts/
│   └── generate-icon.js          # Icon generation script
├── CHANGELOG.md                  # Version history
├── LICENSE                       # MIT License
└── README.md                     # This file
```

### Available Scripts

```bash
npm run dev           # Start development mode
npm run build         # Build for production
npm run lint          # Check code quality
npm run fix-lint      # Auto-fix linting issues
npm run publish       # Submit to Raycast Store
```

### Building from Source

```bash
# Clone the repository
git clone https://github.com/microfacto/raycast-time-tracker.git
cd raycast-time-tracker

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Use conventional commits

## 🐛 Troubleshooting

<details>
<summary><strong>Storage folder not found</strong></summary>

**Solution:** Verify your cloud storage is synced:
```bash
ls ~/Library/CloudStorage  # macOS 12+
ls ~/Google\ Drive         # Legacy
```

If not synced, set a custom path in preferences.
</details>

<details>
<summary><strong>Permission errors</strong></summary>

**Solution:** Grant Raycast file access:
1. System Settings → Privacy & Security → Files and Folders
2. Enable Raycast access to your storage location
</details>

<details>
<summary><strong>Data corruption</strong></summary>

**Solution:** Backup and reset your data file:
```bash
# Backup existing data
cp ~/path/to/data.json ~/path/to/data.json.backup

# Let extension recreate the file
rm ~/path/to/data.json
```
</details>

<details>
<summary><strong>Extension not appearing</strong></summary>

**Solution:** Rebuild and restart Raycast:
```bash
npm run build
# Then restart Raycast (Cmd+Q and reopen)
```
</details>

## 💡 Tips & Tricks

- **Quick Access:** Pin "Log Time" to your favorites for instant access
- **Color Coding:** Use consistent colors for similar project types
- **Comments:** Add detailed comments for better time analysis
- **Archive Often:** Archive completed projects to keep your list clean
- **Backup:** Your data.json syncs via cloud storage - perfect backup!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Raycast](https://raycast.com/)
- Icon from [Lucide Icons](https://lucide.dev/)
- Inspired by the need for simple, fast time tracking

---

<div align="center">

**[⬆ back to top](#️-time-tracker)**

Made with ❤️ by [Microfacto](https://github.com/microfacto)

</div>
