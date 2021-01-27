import { connection } from "../boot.js";
import RecipeSeeder from "./seeders/RecipeSeeder.js";

class Seeder {
  static async seed() {
    console.log("seeding...");
    await RecipeSeeder.seed()

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
