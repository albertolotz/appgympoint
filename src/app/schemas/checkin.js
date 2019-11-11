import Mongoose from 'mongoose';

const checkinSchema = new Mongoose.Schema(
  {
    student_id: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Mongoose.model('checkin', checkinSchema);
