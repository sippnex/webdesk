export interface UnsavedChangesProtector {
  hasUnsavedChanges(): boolean;
  isSaveEnabled(): boolean;
  saveChanges(...args: any): Promise<void> | void;
}
