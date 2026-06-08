"use client";

import { useEffect, useRef, useState } from "react";
import { Cloud, Link2 } from "lucide-react";
import {
  applyCloudProgress,
  loadCloudProgress,
  saveCloudProgress,
  syncCodeToId
} from "@/lib/firebase";

const syncCodeKey = "aclan-next-sync-code";
const syncIdKey = "aclan-next-sync-id";
const lastSyncedKey = "aclan-next-last-synced";

export default function SyncSettings() {
  const [syncCode, setSyncCode] = useState("");
  const [connected, setConnected] = useState(false);
  const [lastSynced, setLastSynced] = useState("");
  const [status, setStatus] = useState("Not connected.");
  const syncIdRef = useRef("");
  const syncingRef = useRef(false);

  useEffect(() => {
    const savedCode = localStorage.getItem(syncCodeKey) || "";
    const savedId = localStorage.getItem(syncIdKey) || "";
    const savedSynced = localStorage.getItem(lastSyncedKey) || "";
    setSyncCode(savedCode);
    setConnected(Boolean(savedId));
    setLastSynced(savedSynced);
    syncIdRef.current = savedId;
    if (savedId) setStatus("Connected. Auto-sync is on.");
  }, []);

  useEffect(() => {
    if (!connected) return;
    const interval = window.setInterval(() => {
      void syncNow();
    }, 30000);

    const onVisibility = () => {
      if (!document.hidden) void syncNow();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [connected]);

  async function connectDevice() {
    if (syncCode.trim().length < 8) {
      setStatus("Use a private sync code with at least 8 characters.");
      return;
    }

    try {
      setStatus("Connecting...");
      const syncId = await syncCodeToId(syncCode);
      syncIdRef.current = syncId;
      localStorage.setItem(syncCodeKey, syncCode);
      localStorage.setItem(syncIdKey, syncId);
      setConnected(true);

      const cloud = await loadCloudProgress(syncId);
      if (cloud?.storage) {
        applyCloudProgress(cloud.storage);
        markSynced("Connected. Cloud progress loaded; refresh if older sections do not update immediately.");
      } else {
        await saveCloudProgress(syncId);
        markSynced("Connected. Auto-sync is on.");
      }
    } catch {
      setConnected(false);
      syncIdRef.current = "";
      localStorage.removeItem(syncIdKey);
      setStatus("Could not connect. Check Anonymous Auth, Firestore rules, and internet.");
    }
  }

  async function syncNow() {
    if (!syncIdRef.current || syncingRef.current) return;
    syncingRef.current = true;
    try {
      setStatus("Syncing...");
      const cloud = await loadCloudProgress(syncIdRef.current);
      if (cloud?.storage) applyCloudProgress(cloud.storage);
      await saveCloudProgress(syncIdRef.current);
      markSynced("Synced.");
    } catch {
      setStatus("Sync failed. Check internet/Firebase settings.");
    } finally {
      syncingRef.current = false;
    }
  }

  function disconnect() {
    localStorage.removeItem(syncCodeKey);
    localStorage.removeItem(syncIdKey);
    syncIdRef.current = "";
    setConnected(false);
    setSyncCode("");
    setStatus("Disconnected on this device. Cloud progress was not deleted.");
  }

  function markSynced(message: string) {
    const value = new Date().toLocaleString();
    localStorage.setItem(lastSyncedKey, value);
    setLastSynced(value);
    setStatus(message);
  }

  return (
    <div className="card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Sync Settings</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Enter your private code once on each device. After that, progress syncs automatically.
          </p>
        </div>
        <div className={`rounded-2xl px-4 py-3 text-sm font-bold ${connected ? "bg-green-300/15 text-green-200" : "bg-black/25 text-zinc-400"}`}>
          <Cloud className="mb-1" size={18} /> {connected ? "Connected" : "Local only"}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
        <input
          className="input"
          type="password"
          placeholder="Enter private sync code"
          value={syncCode}
          onChange={(event) => setSyncCode(event.target.value)}
        />
        <button className="button flex items-center justify-center gap-2" onClick={connectDevice}>
          <Link2 size={18} /> Connect
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button className="ghost-button" disabled={!connected} onClick={disconnect}>
          Disconnect this device
        </button>
      </div>

      <p className="mt-4 text-sm text-zinc-400">{status}</p>
      {lastSynced && <p className="mt-1 text-sm text-zinc-500">Last synced: {lastSynced}</p>}
      <p className="mt-3 text-xs leading-relaxed text-zinc-500">
        This simple personal sync is private-code based. Anyone with the code could connect, so keep it hard to guess.
      </p>
    </div>
  );
}
