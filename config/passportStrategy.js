const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const verify = async (username, password, done) => {
    const userPassword = prisma.user.find
}

const strategy = new LocalStrategy(verify);