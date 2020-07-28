module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      provinceCode: {
        type: String,
        unique: true,
        required: true,
      },
      province: {
        type: String,
        unique: true,
        required: true,
      },
      confirmedCases: {
        type: Number,
        required: true,
      },
      recoveries: {
        type: Number,
        required: true,
      },
      deaths: {
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const provincialStats = mongoose.model("provincialStats", schema);
  return provincialStats;
};

// import mongoose from "mongoose";

// const provincialStatsSchema = new mongoose.Schema(
//   {
//     provinceCode: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     province: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     confirmedCases: {
//       type: Number,
//       required: true,
//     },
//     recoveries: {
//       type: Number,
//       required: true,
//     },
//     deaths: {
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// // provincialStatsSchema.method("toJSON", function () {
// //   const { __v, _id, ...object } = this.toObject();
// //   object.id = _id;
// //   return object;
// // });

// const provincialStats = mongoose.model(
//   "provincialStats",
//   provincialStatsSchema
// );

// export default provincialStats;
