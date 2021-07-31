export interface ModelFormBinding {
  initModel(...args: any): void;
  initForm(...args: any): void;
  updateModel(): void;
  updateForm(): void;
}
