import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(20, { message: "Password is too long" }),
});
export const ForgetPwdSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  new_password: z.string().min(6, { message: "Password must be at least 6 characters long" }).max(20, { message: "Password is too long" }),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "confirm password don't match with Your New Password",
  path: ["confirm_password"],
});


export const signUpSchema = signInSchema.extend({
  firstName: z.string().min(1, "FirstName is required"),
  lastName: z.string().min(1, "LastName is required"),
});

export const productSchema = z.object({

  name: z.string().min(1, "Product name is required"),
  category: z.string().min(3, "category is required"),
  rating: z.number({ message: "rating is required." }),
  price: z.number({ message: "price is required." }),
  stock: z.number({ message: "stock is required." }),
  description: z.string(),
  discount: z.number({ message: "discount is required." }),
  status: z.string().min(1, "status is required"),

});

export const orderSchema = z.object({

  firstName: z.string().min(1, "firstName is required"),
  lastName: z.string().min(3, "lastName is required"),
  Company: z.string().min(3, "Company is required."),
  Country: z.string().min(3, "Country is required."),
  Address: z.string().min(3, "Address is required."),
  City: z.string().min(3, "City is required."),
  paymentMethod: z.string(),
  Phone: z.string().regex(/^[7-9]\d{9}$/, "Phone number must be 10 digits & start with 7, 8, or 9"),
  ZipCode: z.number({ message: "ZipCode is required." }),
  Email: z.string().email("Please enter a valid email address"),

});

export const contactSchema = z.object({

  name: z.string().min(1, "name is required"),
  email: z.string().email("enter a valid email address"),
  subject: z.string().min(1, "subject is required"),
  message: z.string().min(1, "message is required"),

});
export type productSchemaTypes = z.infer<typeof productSchema>;
export type orderSchemaTypes = z.infer<typeof orderSchema>;
