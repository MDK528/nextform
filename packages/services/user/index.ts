import { createHmac, randomBytes } from "node:crypto";
import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/schema";
import { logger } from "@repo/logger";
import { CreateUserWithEmailAndPasswordInput, CreateUserWithEmailAndPasswordInputType, generateUserTokenPayload, GenerateUserTokenPayloadType, signInUserWithEmailAndPasswordInput, SignInUserWithEmailAndPasswordInputType } from "./model";
import * as JWT from "jsonwebtoken";
import { env } from "../env";

class UserService {
  private async getUserByEmail(email: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (!result || result.length === 0) return null;

    return result[0];
  }

  private async generateUserToken(payload: GenerateUserTokenPayloadType) {
    const { id } = await generateUserTokenPayload.parseAsync(payload);

    const token = JWT.sign({ id }, env.JWT_SECRET);
    return { token }
  }

  private async generateHash(salt: string, password: string){
    return createHmac('sha256', salt).update(password).digest('hex');
  }

  public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordInputType) {
    const { fullName, email, password } = await CreateUserWithEmailAndPasswordInput.parseAsync(payload);

    const existingUser = await this.getUserByEmail(email);
    if (existingUser) throw new Error('User with this email already exists');

    const salt = randomBytes(16).toString('hex');
    const hashPassword = await this.generateHash(salt, password);

    const newUser = await db.insert(usersTable).values({ fullName, email, salt, password: hashPassword }).returning({ id: usersTable.id });

    const userId = newUser[0]?.id;
    if (!newUser || newUser.length === 0 || !userId) throw new Error('Failed to create user');

    const { token } = await this.generateUserToken({ id: userId });

    return {
      id: userId,
      token
    }
  }


  public async signInUserWithEmailAndPassword(payload: SignInUserWithEmailAndPasswordInputType) {
    const { email, password } = await signInUserWithEmailAndPasswordInput.parseAsync(payload);

    const existingUser = await this.getUserByEmail(email);
    if (!existingUser) throw new Error('User not found');

    if(!existingUser.salt || !existingUser.password) throw new Error('Invalid authentication method');

    const hashPassword = await this.generateHash(existingUser.salt, password);

    if (hashPassword !== existingUser.password) throw new Error('Invalid email or password');

    const userId = existingUser.id;

    const { token } = await this.generateUserToken({ id: userId });

    return {
      id: userId,
      token
    };
  }
}

export default UserService;
