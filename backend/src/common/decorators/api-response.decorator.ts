import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiSuccessResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(model) }],
      },
    }),
  );
};

export const ApiCreatedSuccessResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiCreatedResponse({
      schema: {
        allOf: [{ $ref: getSchemaPath(model) }],
      },
    }),
  );
};

export const ApiArrayResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        type: 'array',
        items: { $ref: getSchemaPath(model) },
      },
    }),
  );
};
