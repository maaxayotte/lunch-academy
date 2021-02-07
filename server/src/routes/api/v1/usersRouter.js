import express from "express";
import passport from "passport";
import objection from 'objection'
import cleanUserInput from '../../../services/cleanUserInput.js'
import { User } from "../../../models/index.js"
const { ValidationError } = objection

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const formInput = cleanUserInput(req.body)
  const { firstName, email, password, passwordConfirmation } = formInput;

  try {
    if (password !== passwordConfirmation) {
      throw(error)
    }
    const persistedUser = await User.query().insertAndFetch({ email, password, firstName });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error })
  }
});

export default usersRouter;
