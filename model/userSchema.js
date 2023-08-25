const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const { MONGOOSE_PAGINATE_CUSTOM_LABELS } = require('../config/constants/paginationConstant')
const Schema = mongoose.Schema;
mongoosePaginate.paginate.options = { customLabels: MONGOOSE_PAGINATE_CUSTOM_LABELS };
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId, ref: 'user'
  },
  createdAt:
    { type: Date },
  updatedBy: {
    type: mongoose.Types.ObjectId, ref: 'user'
  },
  updatedAt:
    { type: Date },
  deletedAt: { type: Date },
  deletedBy: {
    type: Schema.Types.ObjectId, ref: 'user'
  },
  canNotDel: { type: Boolean, default: false }, // can not delete
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.pre(['find', 'findOne', 'findById', 'updateOne'], function (next) {
  this.getQuery().deletedAt = { $exists: false };
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.plugin(mongoosePaginate);
userSchema.plugin(idValidator);

const user = mongoose.model("user", userSchema);

module.exports = user;
