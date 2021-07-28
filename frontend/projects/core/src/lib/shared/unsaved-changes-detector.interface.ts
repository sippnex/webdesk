export interface UnsavedChangesProtector {
  hasUnsavedChanges(): boolean;
  saveChanges(): Promise<void>;
}
