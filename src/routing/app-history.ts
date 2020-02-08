import { AppHistoryManager } from "./app-history-manager";

const historyManager = new AppHistoryManager();
export const AppHistory = historyManager.history;
