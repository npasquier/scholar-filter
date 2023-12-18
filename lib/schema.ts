import { z } from "zod";

// Define the schema for the form data using Zod
const schema = z.object({
    email: z.string().email({ message: "Invalid email format." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }), // Add more constraints as needed
  });


  export default schema;