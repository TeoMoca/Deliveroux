import mongoose from 'mongoose';
import {livraisons} from './livraisons.model.js';

mongoose.Promise = global.Promise;

export const db = {}

db.mongoose = mongoose
db.livraisons = livraisons;
