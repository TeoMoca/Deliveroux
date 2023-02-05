import mongoose from 'mongoose';
import {commands} from './commands.model.js';

mongoose.Promise = global.Promise;

export const db = {}

db.mongoose = mongoose
db.commands = commands;
