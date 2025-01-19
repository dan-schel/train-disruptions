export type IValidationError = {
  params?: {
    field: string;
    message: string;
  };
  query?: {
    field: string;
    message: string;
  };
  body?: {
    field: string;
    message: string;
  };
};

export class ValidationError extends Error {
  public status = 400;
  public errors: IValidationError;
  public constructor(errors: IValidationError) {
    super("Validation error");
    this.errors = errors;
  }
}
