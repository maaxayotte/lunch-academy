import { connection } from "../boot.js";
import RecipeSeeder from "./seeders/RecipeSeeder.js";
// import UserSeeder from './seeders/UserSeeder.js'

class Seeder {
  static async seed() {
    // console.log("seeding users...")
    // await UserSeeder.seed()

    console.log("seeding recipes...");
    await RecipeSeeder.seed()

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
