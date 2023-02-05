import mongoose from 'mongoose';
import {notifications} from './notifications.model.js';

mongoose.Promise = global.Promise;

export const db = {}

db.mongoose = mongoose
db.notifications = notifications;
