import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Application from "@ioc:Adonis/Core/Application";
import Database from "@ioc:Adonis/Lucid/Database";

import Job from "App/Models/Job";
import JobImage from "App/Models/JobImage";

export default class JobsController {
  // Create
  public async add({ request, response }) {
    const data = request.body();
    // schema
    const jobSchema = schema.create({
      title: schema.string({ trim: true }, [
        rules.minLength(3),
        rules.maxLength(50)
      ]),
      posterId: schema.number(),
      clothesTypes: schema.string({}, [
        rules.minLength(3),
        rules.maxLength(20)
      ]),
      discription: schema.string(),
      budget: schema.number.optional(),
      address: schema.string({ trim: true }, [
        rules.minLength(3),
        rules.maxLength(10)
      ])
    });

    // message
    const messages = {
      required: "{{ field }} is required",
      minLength:
        "{{ field }} must be at least {{ options.minLength }} characters long",
      maxLength:
        "{{ field }} cannot be longer than {{ options.maxLength }} characters long",
      "*": (field, rule, options) => {
        return `${field} failed ${rule} validation`;
      }
    };

    const validatedData = await request.validate({
      schema: jobSchema,
      messages,
      data
    });
    try {
      //   create job
      const job = await Job.create(validatedData);

      //   Create Images
      const images = request.files("images", {
        types: ["image"],
        size: "2mb",
        extnames: ["jpg", "png"]
      });
      await images.map(async (image) => {
        const fileName = `${Date.now()}_${image.clientName}`;
        await image.move(Application.tmpPath("uploads"), {
          name: fileName
        });
        await JobImage.create({
          jobId: job.id,
          image: fileName
        });
      });

      return response.ok({ message: "Job created successfully", job });
    } catch (error) {
      console.log(error);
      response.badRequest({ message: error.messages });
    }
  }

  public async getAll({ request, response }, HttpContextContract) {
    try {
      const jobs = await Database.from("jobs")
        .leftJoin("job_images", "jobs.id", "=", "job_images.job_id")
        .leftJoin("quotations", "jobs.id", "=", "quotations.job_id")
        .select(
          "jobs.*",
          Database.raw("GROUP_CONCAT(DISTINCT job_images.image) as images"),
          Database.raw("count(distinct quotations.id) as quotationNo")
        )
        .groupBy("jobs.id");

      response.ok(jobs);
    } catch (error) {
      console.log(error);
      response.badRequest({ message: error.message });
    }
  }

  public async getJob({ request, response, params }, HttpContextContract) {
    const id = params.id;
    try {
      const job = await Job.query()
        .where("id", id)
        .preload("jobImages", (query) => {
          query.where("jobId", id);
        })
        .first();
      response.ok(job);
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
      await Job.query().where("id", id).delete();
    } catch (error) {
      console.log(error);
      response.badRequest({ message: error.message });
    }
  }
  public async update({ request, response, params }, HttpContextContract) {
    const id = params.id;
    const data = request.body();
    try {
      await Job.query().where("id", id).update(data);
    } catch (error) {
      console.log(error);
      response.badRequest({ message: error.message });
    }
  }
}
