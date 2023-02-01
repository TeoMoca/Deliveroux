import mongoose from 'mongoose';
import {articles} from './articles.model.js';
import {menus} from './menus.model.js';

mongoose.Promise = global.Promise;

export const db = {}

db.mongoose = mongoose
db.articles = articles;
db.menus = menus;
