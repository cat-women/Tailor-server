import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Roles from "../../Enums/Roles";
import User from "../../Models/User";

export default class UsersController {
  // User schema
  private userSchema = schema.create({
    firstName: schema.string({}, [rules.minLength(3), rules.maxLength(20)]),
    lastName: schema.string({}, [rules.minLength(3), rules.maxLength(20)]),
    email: schema.string([
      rules.unique({ table: "users", column: "email", caseInsensitive: true }),
      rules.email()
    ]),
    password: schema.string({}, [rules.minLength(5)]),
    phone: schema.string([rules.mobile({ strict: false })]),
    address: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(10)
    ]),
    roleId: schema.enum.optional(Object.values(Roles))
  });

  // message
  private messages = {
    required: "{{ field }} is required",
    minLength:
      "{{ field }} must be at least {{ options.minLength }} characters long",
    maxLength:
      "{{ field }} cannot be longer than {{ options.maxLength }} characters long",
    "*": (field, rule, arrayExpressionPointer, options) => {
      return `${field} failed ${rule} validation`;
    }
  };

  //Add user
  public async register({ request, response }, HttpContextContract) {
    let data = request.body();
    let role = data.role.toUpperCase();
    data.roleId = Roles[role];
    try {
      const validatedData = await request.validate({
        schema: this.userSchema,
        messages: this.messages,
        data
      });
      User.create(validatedData);
      return response.ok({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      response.badRequest({ message: error.messages });
    }
  }

  // login
  public async login({ request, response, auth }, HttpContextContract) {
    const { email, password } = request.only(["email", "password"]);

    try {
      // Revoke all tokens for the user associated with the given foreign key
      let user = await User.findBy("email", email);

      await auth.use("api").revoke();

      const token = await auth.use("api").attempt(email, password, {
        name: "Access Token",
        expiresIn: "1 days"
      });

      user.roleId = Roles[user.roleId];
      response.ok({ token: token, user: user });
    } catch (error) {
      console.log(error);
      return response.unauthorized("Invalid credentials");
    }
  }
  // update user
  public async updateUser({ request, response, params }, HttpContextContract) {
    const data = request.body();
    try {
      const user = await User.findOrFail(params.id);
      if (!user) {
        return response.notFound({ message: "User not found" });
      }
      await user.merge(data).save();
      response.ok({ message: "User data updated " });
    } catch (error) {
      console.log(error.messages.errors);
      return response.badRequest({ message: error.message });
    }
  }
}
