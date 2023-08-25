import { StatusCodes } from 'http-status-codes';
import usersService from '../services/userServices';

const createUser = async (req, res) => {
  const newUser = await usersService.createUser(req.body).then((user) => user);
  res.status(StatusCodes.CREATED).json(newUser);
};
const getUsers = async (req, res) => {
  const users = await usersService.getUsers();
  res.json(users);
};

export default {
  createUser,
  getUsers,
};
