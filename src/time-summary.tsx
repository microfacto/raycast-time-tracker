import {
  ActionPanel,
  Action,
  Icon,
  LaunchType,
  launchCommand,
  Detail,
} from "@raycast/api";
import React, { useEffect, useState } from "react";
import {
  format,
  parseISO,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import { getEntries, getProjects } from "./utils/storage";
import { formatDurationDetailed } from "./utils/duration";
import { TimeEntry, Project } from "./utils/types";

interface EntryWithProject extends TimeEntry {
  project: Project;
}

type SummaryPeriod = "week" | "month";

// Map hex colors to emoji circles
function getColorEmoji(hex: string): string {
  const colorMap: Record<string, string> = {
    "#EF4444": "\u{1F534}", // red
    "#F97316": "\u{1F7E0}", // orange
    "#EAB308": "\u{1F7E1}", // yellow
    "#22C55E": "\u{1F7E2}", // green
    "#3B82F6": "\u{1F535}", // blue
    "#8B5CF6": "\u{1F7E3}", // purple
    "#EC4899": "\u{1FA77}", // pink
  };
  return colorMap[hex] || "\u26AA"; // default white circle
}

export default function TimeSummary() {
  const [entries, setEntries] = useState<EntryWithProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState<SummaryPeriod>("month");

  async function loadData() {
    try {
      const [entriesList, projectsList] = await Promise.all([
        getEntries(),
        getProjects(true),
      ]);

      const entriesWithProjects = entriesList
        .map((entry) => {
          const project = projectsList.find((p) => p.id === entry.projectId);
          if (!project) return null;
          return { ...entry, project };
        })
        .filter((e): e is EntryWithProject => e !== null);

      setEntries(entriesWithProjects);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Filter entries based on period
  function getFilteredEntries(): EntryWithProject[] {
    const now = new Date();

    if (period === "week") {
      const weekStart = startOfWeek(now, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
      return entries.filter((e) => {
        const entryDate = parseISO(e.date);
        return isWithinInterval(entryDate, { start: weekStart, end: weekEnd });
      });
    } else {
      const monthStart = startOfMonth(now);
      const monthEnd = endOfMonth(now);
      return entries.filter((e) => {
        const entryDate = parseISO(e.date);
        return isWithinInterval(entryDate, {
          start: monthStart,
          end: monthEnd,
        });
      });
    }
  }

  const filteredEntries = getFilteredEntries();

  // Calculate totals by project
  const projectTotals = filteredEntries.reduce(
    (acc, entry) => {
      const key = entry.project.id;
      if (!acc[key]) {
        acc[key] = {
          project: entry.project,
          total: 0,
        };
      }
      acc[key].total += entry.duration;
      return acc;
    },
    {} as Record<string, { project: Project; total: number }>
  );

  // Sort by total time descending
  const sortedProjects = Object.values(projectTotals).sort(
    (a, b) => b.total - a.total
  );

  // Calculate grand total
  const grandTotal = sortedProjects.reduce((sum, p) => sum + p.total, 0);

  // Generate markdown
  const periodTitle =
    period === "week"
      ? `This Week (${format(startOfWeek(new Date(), { weekStartsOn: 1 }), "MMM d")} - ${format(endOfWeek(new Date(), { weekStartsOn: 1 }), "MMM d")})`
      : format(new Date(), "MMMM yyyy");

  let markdown = `# ${periodTitle}\n\n`;

  // Total
  markdown += `**Total: ${formatDurationDetailed(grandTotal)}** | ${filteredEntries.length} entries\n\n`;

  // By Project table
  markdown += `## By Project\n\n`;

  if (sortedProjects.length === 0) {
    markdown += `*No time entries for this period*\n\n`;
  } else {
    markdown += `| Project | Time |\n`;
    markdown += `|---------|------|\n`;

    for (const { project, total } of sortedProjects) {
      const emoji = getColorEmoji(project.color);
      markdown += `| ${emoji} ${project.name} | ${formatDurationDetailed(total)} |\n`;
    }
    markdown += `\n`;
  }

  return (
    <Detail
      isLoading={isLoading}
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action
            title={period === "week" ? "Show Month" : "Show Week"}
            icon={Icon.Calendar}
            onAction={() => setPeriod(period === "week" ? "month" : "week")}
          />
          <ActionPanel.Section>
            <Action
              title="Log Time"
              icon={Icon.Clock}
              shortcut={{ modifiers: ["cmd"], key: "l" }}
              onAction={() =>
                launchCommand({ name: "log-time", type: LaunchType.UserInitiated })
              }
            />
            <Action
              title="View Time Entries"
              icon={Icon.List}
              shortcut={{ modifiers: ["cmd"], key: "e" }}
              onAction={() =>
                launchCommand({
                  name: "view-entries",
                  type: LaunchType.UserInitiated,
                })
              }
            />
            <Action
              title="Manage Projects"
              icon={Icon.Folder}
              shortcut={{ modifiers: ["cmd"], key: "p" }}
              onAction={() =>
                launchCommand({
                  name: "manage-projects",
                  type: LaunchType.UserInitiated,
                })
              }
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}
