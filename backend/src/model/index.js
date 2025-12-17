import mongoose from 'mongoose';
import UserModel from './user.js';
import SessionModel from './sessionSchema.js';


export { UserModel, SessionModel };


export function setupModels() {
    SessionModel.syncIndexes();
    UserModel.syncIndexes();
}