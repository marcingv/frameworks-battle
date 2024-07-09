export class LoadedRemotesDefinitions {
  private definitions: Record<string, string> = {};

  public setDefinitions(definitions: Record<string, string>) {
    this.definitions = definitions;
  }

  public getDefinitions(): Record<string, string> {
    return this.definitions;
  }
}

export const LOADED_REMOTE_DEFINITIONS: LoadedRemotesDefinitions =
  new LoadedRemotesDefinitions();
