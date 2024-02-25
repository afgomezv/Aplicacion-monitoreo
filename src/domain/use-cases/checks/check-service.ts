interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type successCallBack = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly sucessCallback: successCallBack,
    private errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      this.sucessCallback();

      return true;
    } catch (error) {
      console.log(`${error}`);

      this.errorCallback(`${error}`);
      return false;
    }
  }
}
