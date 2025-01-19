# API <!-- omit in toc -->

For this project we are using [ExpressJS](https://expressjs.com/) for our API server.

## Contents <!-- omit in toc -->

- [Routing](#routing)
- [Typed Requests and Responses](#typed-requests-and-responses)

## Routing

The routes are served in [api.ts](/server/routes/api.ts) with all requests prefixed with `/api` being handled here.

To create a new API here are the basics. Below is a general idea of how the API should be structured.

`server/routes/crayons.ts`

```ts
import { Router } from "express";

const CrayonRouter = Router();

/** /api/crayons/draw */
CrayonRouter.post("/draw", someMiddleware, (req, res) => {
  const { crayon } = req.body;
  // Handle draw on painting
  res.json({ uses: 0 });
});

export default CrayonRouter;
```

Each API router should be defined within a file and imported into `api.ts` like below. The router along with a path is provided to create a route handler that handles all requests made to `/api/<PATH>/*`

`server/routes/api.ts`

```ts
/**
 * Routes - START
 */
apiRouter.use("/disruptions", DisruptionRouter);
apiRouter.use("/crayons", CrayonRouter);
/**
 * Routes - END
 */
```

## Typed Requests and Responses

Request and Response can be typed using `validateMiddle`

```ts
validateMiddleware({ 
  params?: ZodSchema; // Object
  query?: ZodSchema; // Object
  body?: ZodSchema; // Object
  response?: ZodSchema; // Any
}),
```

The function validates the request body, params, query and response body with the provided [zod](https://zod.dev/) schemas and types the request in the subsequent handlers.
<br>
If the schema is not provided for a property, the respective property will resolve to their default type.
<br>
As express parses the request body, params and query as objects, the schemas provided must be an object schema (```z.object({ ... })```).
<br>
Although it isn't required to provide a schema for the response, it's generally a good idea since we'll be using the types in the frontend as well.


An example below is how it would be used to type the body of the request and response.

```ts
CrayonRouter.post(
  "/draw",
  validateMiddleware({ 
    body: z.object({
      crayon: z.string(),
    }),
    response: z.object({
      uses: z.number(),
    }),
  }),
  (req, res) => {
    // crayon is now of type `string`, 
    // without the middleware, crayon would have been typed as `any`
    const { crayon } = req.body; 
    // Handle draw on painting
    res.json({ uses: 0 });
  },
);
```
