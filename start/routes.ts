/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { hello: "world" };
});

Route.group(() => {
  // User routes
  Route.group(() => {
    Route.post("/register", "UsersController.register").as("register");
    Route.post("/login", "UsersController.login").as("login");
    Route.put("/update/:id", "UsersController.updateUser")
      .as("update")
      .middleware("auth");
  })
    .prefix("/user")
    .as("user");

  // Job routes
  Route.group(() => {
    Route.post("/add", "JobsController.add").as("add").middleware("auth");
    Route.get("/", "JobsController.getAll").as("getJobs");

    Route.get("/:id", "JobsController.getJob").as("get").middleware("auth");
    Route.put("/:id", "JobsController.update").as("update").middleware("auth");
    Route.delete("/:id", "JobsController.delete")
      .as("delete")
      .middleware("auth");
  })
    .prefix("/job")
    .as("job");

  // Quotion  routes
  Route.group(() => {
    Route.post("/", "QuotationsController.add").as("add")
    Route.get("/user/:id", "QuotationsController.getQuationsByUserId")
      .as("quotation.userId")
      .middleware("auth");
    Route.get("/job/:id", "QuotationsController.getQuationByJobId")
      .as("quotation.jobId")
      .middleware("auth");
    Route.put("/:id", "QuotationsController.update")
      .as("update")
      .middleware("auth");
    Route.delete("/:id", "QuotationsController.delete")
      .as("delete")
      .middleware("auth");
  })
    .prefix("/quotation")
    .as("quotation");
})
  .prefix("api")
  .as("api");
