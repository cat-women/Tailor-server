import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

import Quotation from "App/Models/Quotation";

export default class QuotationsController {
  /**
   * async add
   */
  public async add({ request, response }, HttpContextContract) {
    const data = request.body();
    console.log("client data ", data);
    // schema
    const quotationSchema = schema.create({
      jobId: schema.number(),
      requesterId: schema.number(),
      price: schema.number(),
      comments: schema.string.optional(),
      status: schema.boolean.optional()
    });

    // message
    const messages = {
      required: "{{ field }} is required",
      "*": (field, rule, arrayExpressionPointer, options) => {
        return `${field} failed ${rule} validation`;
      }
    };

    const validatedData = await request.validate({
      schema: quotationSchema,
      messages,
      data
    });
    try {
      const quotation = await Quotation.create(validatedData);
      response.ok({ data: quotation });
    } catch (error) {
      console.log(error);
      response.badRequest({ message: error.messages });
    }
  }
  public async getQuationsByUserId(
    { request, response, params },
    HttpContextContract
  ) {
    const id = params.id;
    try {
      const quotation = await Quotation.query().where("requesterId", id);
      response.ok({ data: quotation });
    } catch (error) {
      console.log(error);
      response.badRequest({ message: error.message });
    }
  }
  public async getQuationsByJobId(
    { request, response, params },
    HttpContextContract
  ) {
    const id = params.id;
    try {
      const quotation = await Quotation.query().where("jobId", id);
      response.ok({ data: quotation });
    } catch (error) {
      console.log(error);
      response.badRequest({ message: error.message });
    }
  }

  /**
   * delete
   */
  public async delete({ request, response, params }, HttpContextContract) {
    const id = params.id;
    try {
      const quotation = await Quotation.query().where("id", id).delete();
      response.ok({ data: quotation });
    } catch (error) {
      console.log(error);
      response.badRequest({ message: error.message });
    }
  }
  public async update({ request, response, params }, HttpContextContract) {
    const id = params.id;
    const data = request.body();
    try {
      const quotation = await Quotation.query().where("id", id).update(data);
      response.ok({ data: quotation });
    } catch (error) {
      console.log(error);
      response.badRequest({ message: error.message });
    }
  }
}
